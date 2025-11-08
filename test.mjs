import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import fs from "fs";
import open from "open";

// 🔐 Supabase connection
const supabase = createClient(
  "https://fenmmkwfjbkragfshers.supabase.co",
  ""
);

// 🛡 HTML escape utility
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 🧮 calculate median
function median(arr) {
  if (arr.length === 0) return null;
  const sorted = arr.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return (sorted.length % 2 === 0)
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

// 📦 gather data
async function fetchData() {
  const { data, error } = await supabase.from("acceptances").select("*");
  if (error) throw error;
  return data;
}

// 📅 filtering data more than one year
function filterOldEntries(data) {
  const oneYearAgo = dayjs().subtract(365, "day");
  return data.filter(row => dayjs(row.last_updated).isBefore(oneYearAgo));
}

// ⚠️ the latest data within a month & more 30% than the average
function filterRecentHighEntries(data) {
  const oneMonthAgo = dayjs().subtract(30, "day");
  const recent = data.filter(row => dayjs(row.last_updated).isAfter(oneMonthAgo));
  const valid = recent.filter(row =>
    isFinite(row.cut_score) && isFinite(row.credits)
  );

  if (valid.length === 0) {
    return { filtered: [], medianCut: null, medianCredits: null };
  }

  const cutScores = valid.map(r => Number(r.cut_score));
  const credits = valid.map(r => Number(r.credits));

  const medianCut = median(cutScores);
  const medianCredits = median(credits);

  const cutThreshold = medianCut * 0.3;
  const creditsThreshold = medianCredits * 0.3;

  const filtered = valid.filter(r =>
    r.cut_score > cutThreshold || r.credits > creditsThreshold
  );

  return { filtered, medianCut, medianCredits };
}

// 평균(중앙값) 표시 없이 표만 생성
function generateTableWithoutMedianHTML(entries) {
  const tableRows = entries.map(row => `
    <tr>
      <td>${escapeHtml(row.school_name ?? row.School_name ?? row.institution_id ?? "N/A")}</td>
      <td>${row.cut_score ?? ""}</td>
      <td>${row.credits ?? ""}</td>
      <td>${dayjs(row.last_updated).format("YYYY-MM-DD")}</td>
    </tr>
  `).join("\n");

  return `
    <table>
      <thead>
        <tr>
          <th>School Name</th>
          <th>Cut Score</th>
          <th>Credits</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
}

// 평균(중앙값) 표시 포함 표 생성(기존 함수)
function generateTableWithMedianHTML(entries, medianCut = null, medianCredits = null) {
  const tableRows = entries.map(row => `
    <tr>
      <td>${escapeHtml(row.school_name ?? row.School_name ?? row.institution_id ?? "N/A")}</td>
      <td>${row.cut_score ?? ""}</td>
      <td>${row.credits ?? ""}</td>
      <td>${dayjs(row.last_updated).format("YYYY-MM-DD")}</td>
    </tr>
  `).join("\n");

  const safeMedianCut = (medianCut !== null && medianCut !== undefined) ? medianCut.toFixed(2) : "N/A";
  const safeMedianCredits = (medianCredits !== null && medianCredits !== undefined) ? medianCredits.toFixed(2) : "N/A";

  const medianInfo = `<p><strong>📊 Median cut_score:</strong> ${safeMedianCut} | <strong>credits:</strong> ${safeMedianCredits}</p>`;

  return `
    ${medianInfo}
    <table>
      <thead>
        <tr>
          <th>School Name</th>
          <th>Cut Score</th>
          <th>Credits</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
}

// 전체 HTML 생성 함수에서 분리 적용
function generateFullHTMLSeperateMedian(oldEntries, recentEntries, medianCut, medianCredits) {
  const oldTable = generateTableWithoutMedianHTML(oldEntries);
  const recentTable = generateTableWithMedianHTML(recentEntries, medianCut, medianCredits);

  return `
    <html>
      <head>
        <title>Supabase Data Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h2 { margin-top: 40px; }
          table { border-collapse: collapse; width: 100%; font-size: 16px; margin-top: 10px; }
          th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
          th { background-color: #f5f5f5; }
          p { font-weight: bold; }
        </style>
      </head>
      <body>
        <h2>📅 Data >1 Year Old</h2>
        ${oldTable}
        <h2>⚠️ Anomaly Detection (Recent >30% above median)</h2>
        ${recentTable}
      </body>
    </html>
  `;
}

// 🚀 implement main
async function main() {
  try {
    console.log("⏳ Fetching data from Supabase...");
    const data = await fetchData();

    const oldEntries = filterOldEntries(data);
    const { filtered: highEntries, medianCut, medianCredits } = filterRecentHighEntries(data);

    if (oldEntries.length === 0 && highEntries.length === 0) {
      console.log("🎉 No data to display.");
      return;
    }

    const html = generateFullHTMLSeperateMedian(oldEntries, highEntries, medianCut, medianCredits);
    const filePath = "./combined_data.html";
    fs.writeFileSync(filePath, html);
    console.log(`📋 Opening report (old: ${oldEntries.length}, anomalies: ${highEntries.length})`);
    await open(filePath);

  } catch (err) {
    console.error("❌ Error occurred:", err);
  }
}

main();
