import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import fs from "fs";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";

// Supabase 연결
const url = "https://fenmmkwfjbkragfshers.supabase.co";
const key = "";
const supabase = createClient(url, key);

// bring data
async function fetchData() {
  const { data, error } = await supabase.from("acceptances").select("*");
  if (error) throw error;
  return data;
}

// data filtering
function filterOldEntries(data) {
  const oneYearAgo = dayjs().subtract(365, "day");
  return data.filter((row) => dayjs(row.last_updated).isBefore(oneYearAgo));
}

// 3️⃣ 시각화 (cut_score 분포)
async function plotHistogram(values) {
  const width = 800;
  const height = 500;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const configuration = {
    type: "bar",
    data: {
      labels: values.map((_, i) => i + 1),
      datasets: [
        {
          label: "cut_score Distribution (1 year+ old data)",
          data: values,
          backgroundColor: "rgba(255, 165, 0, 0.6)",
        },
      ],
    },
  };

  const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  fs.writeFileSync("old_data_histogram.png", buffer);
  console.log("📊 Histogram saved as old_data_histogram.png");
}

// 4️⃣ 실행 함수
async function main() {
  console.log("⏳ Fetching data from Supabase...");
  const df = await fetchData();

  console.log(`✅ Total rows: ${df.length}`);
  const oldEntries = filterOldEntries(df);
  console.log(`⚠️ Old entries (1+ year): ${oldEntries.length}`);

  if (oldEntries.length > 0) {
    const cutScores = oldEntries.map((r) => r.cut_score).filter((x) => x != null);
    await plotHistogram(cutScores);
  } else {
    console.log("🎉 No data older than 1 year.");
  }
}

main();
