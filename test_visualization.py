import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import IsolationForest
from supabase import create_client, Client
from datetime import datetime, timedelta 

# Supabase 연결
url = "https://fenmmkwfjbkragfshers.supabase.co"
key = ""
supabase: Client = create_client(url, key)

@st.cache_data
def fetch_data():
    res = supabase.table("acceptances").select("*").execute()
    return pd.DataFrame(res.data)

df = fetch_data()

st.title("📅 1년 이상 지난 데이터 확인 (acceptances 테이블)")
st.write("전체 데이터 미리보기:")
st.dataframe(df)

# 날짜 파싱
df["last_updated"] = pd.to_datetime(df["last_updated"], errors="coerce")

# 1년 전 기준일
import pytz
one_year_ago = pd.Timestamp.utcnow() - pd.Timedelta(days=365)


# 필터링
st.subheader("📌 1년 이상 업데이트되지 않은 데이터")
old_entries = df[df["last_updated"] < one_year_ago]
st.dataframe(old_entries)

# 시각화 (optional)
if not old_entries.empty:
    st.subheader("📊 오래된 데이터 cut_score 분포")
    fig, ax = plt.subplots()
    ax.hist(old_entries["cut_score"].dropna(), bins=10, color="orange")
    ax.set_title("cut_score Histogram (1년 이상 경과 데이터)")
    ax.set_xlabel("cut_score")
    ax.set_ylabel("Count")
    st.pyplot(fig)
else:
    st.success("🎉 1년 이상 지난 데이터가 없습니다.")