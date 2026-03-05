import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend, ComposedChart } from "recharts";

const ALL_DEALS = [
  {stage:"690",amt:8000,prob:0.5,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-03-04"},
  {stage:"690",amt:0,prob:0.5,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-26"},
  {stage:"496",amt:18000,prob:0.1,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-25"},
  {stage:"496",amt:18000,prob:0.1,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-25"},
  {stage:"497",amt:50000,prob:0.2,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-24"},
  {stage:"690",amt:12500,prob:0.5,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-16"},
  {stage:"496",amt:5000,prob:0.1,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-11"},
  {stage:"496",amt:5000,prob:0.1,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-11"},
  {stage:"495",amt:5000,prob:0.02,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-11"},
  {stage:"495",amt:5000,prob:0.02,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-11"},
  {stage:"496",amt:5000,prob:0.1,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-11"},
  {stage:"496",amt:5000,prob:0.1,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-11"},
  {stage:"497",amt:50000,prob:0.2,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-10"},
  {stage:"497",amt:63000,prob:0.2,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-10"},
  {stage:"694",amt:35000,prob:0,won:false,lost:true,closedate:"2026-02-25",createdate:"2026-02-10"},
  {stage:"497",amt:5000,prob:0.2,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-10"},
  {stage:"497",amt:70000,prob:0.2,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-02-10"},
  {stage:"693",amt:6000,prob:1,won:true,lost:false,closedate:"2026-02-20",createdate:"2026-02-10"},
  {stage:"497",amt:37800,prob:0.2,won:false,lost:false,closedate:"2026-03-31",createdate:"2026-01-28"},
  {stage:"694",amt:25000,prob:0,won:false,lost:true,closedate:"2026-01-30",createdate:"2026-01-23"},
  {stage:"694",amt:20000,prob:0,won:false,lost:true,closedate:"2026-01-23",createdate:"2026-01-12"},
  {stage:"690",amt:20000,prob:0.5,won:false,lost:false,closedate:"2026-01-20",createdate:"2026-01-05"},
  {stage:"694",amt:80000,prob:0,won:false,lost:true,closedate:"2026-02-20",createdate:"2025-12-23"},
  {stage:"497",amt:5000,prob:0.2,won:false,lost:false,closedate:"2026-01-31",createdate:"2025-12-19"},
  {stage:"497",amt:15000,prob:0.2,won:false,lost:false,closedate:"2026-01-31",createdate:"2025-12-16"},
  {stage:"690",amt:50000,prob:0.5,won:false,lost:false,closedate:"2026-01-31",createdate:"2025-12-16"},
  {stage:"496",amt:5000,prob:0.1,won:false,lost:false,closedate:"2026-01-31",createdate:"2025-12-12"},
  {stage:"496",amt:5000,prob:0.1,won:false,lost:false,closedate:"2026-01-31",createdate:"2025-12-09"},
  {stage:"496",amt:5000,prob:0.1,won:false,lost:false,closedate:"2026-01-31",createdate:"2025-12-05"},
  {stage:"496",amt:5000,prob:0.1,won:false,lost:false,closedate:"2026-01-31",createdate:"2025-12-05"},
  {stage:"496",amt:5000,prob:0.1,won:false,lost:false,closedate:"2026-01-29",createdate:"2025-12-05"},
  {stage:"690",amt:5000,prob:0.5,won:false,lost:false,closedate:"2026-01-30",createdate:"2025-11-28"},
  {stage:"495",amt:5000,prob:0.02,won:false,lost:false,closedate:"2026-05-15",createdate:"2025-11-20"},
  {stage:"497",amt:40000,prob:0.2,won:false,lost:false,closedate:"2026-01-15",createdate:"2025-11-10"},
  {stage:"497",amt:30000,prob:0.2,won:false,lost:false,closedate:"2026-01-07",createdate:"2025-11-06"},
  {stage:"496",amt:30000,prob:0.1,won:false,lost:false,closedate:"2026-01-07",createdate:"2025-11-06"},
  {stage:"693",amt:26400,prob:1,won:true,lost:false,closedate:"2025-12-16",createdate:"2025-11-06"},
  {stage:"690",amt:18000,prob:0.5,won:false,lost:false,closedate:"2026-01-07",createdate:"2025-11-06"},
  {stage:"690",amt:135000,prob:0.5,won:false,lost:false,closedate:"2026-04-03",createdate:"2025-11-06"},
  {stage:"690",amt:40000,prob:0.5,won:false,lost:false,closedate:"2026-06-05",createdate:"2025-11-06"},
  {stage:"690",amt:77400,prob:0.5,won:false,lost:false,closedate:"2026-01-07",createdate:"2025-11-06"},
  {stage:"694",amt:72000,prob:0,won:false,lost:true,closedate:"2025-11-27",createdate:"2025-11-06"},
  {stage:"690",amt:75600,prob:0.5,won:false,lost:false,closedate:"2026-01-07",createdate:"2025-11-06"},
  {stage:"693",amt:37800,prob:1,won:true,lost:false,closedate:"2026-02-10",createdate:"2025-11-06"},
  {stage:"693",amt:37800,prob:1,won:true,lost:false,closedate:"2026-02-10",createdate:"2025-11-06"},
  {stage:"693",amt:26460,prob:1,won:true,lost:false,closedate:"2026-02-10",createdate:"2025-11-06"},
  {stage:"693",amt:40000,prob:1,won:true,lost:false,closedate:"2026-02-10",createdate:"2025-11-06"},
  {stage:"690",amt:30000,prob:0.5,won:false,lost:false,closedate:"2026-01-07",createdate:"2025-11-05"},
  {stage:"497",amt:20000,prob:0.2,won:false,lost:false,closedate:"2025-10-15",createdate:"2025-10-16"},
  {stage:"495",amt:5000,prob:0.02,won:false,lost:false,closedate:"2025-10-16",createdate:"2025-10-16"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-11-28",createdate:"2025-10-16"},
  {stage:"693",amt:18130,prob:1,won:true,lost:false,closedate:"2025-11-30",createdate:"2025-10-02"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2026-01-30",createdate:"2025-10-02"},
  {stage:"694",amt:24000,prob:0,won:false,lost:true,closedate:"2025-09-10",createdate:"2025-08-18"},
  {stage:"693",amt:15960,prob:1,won:true,lost:false,closedate:"2025-10-02",createdate:"2025-08-18"},
  {stage:"694",amt:24000,prob:0,won:false,lost:true,closedate:"2025-11-05",createdate:"2025-08-18"},
  {stage:"693",amt:15680,prob:1,won:true,lost:false,closedate:"2025-09-10",createdate:"2025-08-18"},
  {stage:"694",amt:20000,prob:0,won:false,lost:true,closedate:"2025-11-05",createdate:"2025-08-08"},
  {stage:"496",amt:12000,prob:0.1,won:false,lost:false,closedate:"2025-08-01",createdate:"2025-08-07"},
  {stage:"496",amt:15000,prob:0.1,won:false,lost:false,closedate:"2025-08-05",createdate:"2025-08-07"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-11-05",createdate:"2025-08-07"},
  {stage:"495",amt:5000,prob:0.02,won:false,lost:false,closedate:"2025-08-05",createdate:"2025-08-07"},
  {stage:"694",amt:12000,prob:0,won:false,lost:true,closedate:"2025-10-02",createdate:"2025-07-14"},
  {stage:"694",amt:25000,prob:0,won:false,lost:true,closedate:"2025-07-14",createdate:"2025-07-09"},
  {stage:"693",amt:22750,prob:1,won:true,lost:false,closedate:"2025-08-18",createdate:"2025-07-09"},
  {stage:"694",amt:25000,prob:0,won:false,lost:true,closedate:"2025-10-02",createdate:"2025-07-01"},
  {stage:"690",amt:10000,prob:0.5,won:false,lost:false,closedate:"2025-06-27",createdate:"2025-06-27"},
  {stage:"694",amt:61600,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2025-06-24"},
  {stage:"694",amt:15000,prob:0,won:false,lost:true,closedate:"2025-11-28",createdate:"2025-06-20"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2025-06-20"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2025-06-20"},
  {stage:"694",amt:15000,prob:0,won:false,lost:true,closedate:"2025-07-06",createdate:"2025-06-20"},
  {stage:"694",amt:25000,prob:0,won:false,lost:true,closedate:"2025-07-11",createdate:"2025-06-20"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-10-02",createdate:"2025-06-20"},
  {stage:"694",amt:30000,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2025-06-20"},
  {stage:"694",amt:25000,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2025-06-20"},
  {stage:"694",amt:30000,prob:0,won:false,lost:true,closedate:"2025-10-02",createdate:"2025-06-16"},
  {stage:"694",amt:25000,prob:0,won:false,lost:true,closedate:"2025-07-07",createdate:"2025-06-12"},
  {stage:"694",amt:25000,prob:0,won:false,lost:true,closedate:"2025-08-13",createdate:"2025-06-10"},
  {stage:"496",amt:12000,prob:0.1,won:false,lost:false,closedate:"2025-05-05",createdate:"2025-06-10"},
  {stage:"495",amt:5000,prob:0.02,won:false,lost:false,closedate:"2025-05-05",createdate:"2025-06-10"},
  {stage:"496",amt:5000,prob:0.1,won:false,lost:false,closedate:"2025-05-05",createdate:"2025-06-10"},
  {stage:"693",amt:5000,prob:1,won:true,lost:false,closedate:"2024-09-25",createdate:"2025-05-30"},
  {stage:"693",amt:5760,prob:1,won:true,lost:false,closedate:"2025-05-30",createdate:"2025-05-30"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-07-09",createdate:"2025-05-29"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-07-09",createdate:"2025-05-29"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-07-09",createdate:"2025-05-29"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2025-05-28"},
  {stage:"693",amt:28000,prob:1,won:true,lost:false,closedate:"2025-07-09",createdate:"2025-05-28"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-07-09",createdate:"2025-05-28"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-07-09",createdate:"2025-05-28"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-08-21",createdate:"2025-05-28"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-07-09",createdate:"2025-05-28"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-07-09",createdate:"2025-05-28"},
  {stage:"694",amt:25000,prob:0,won:false,lost:true,closedate:"2025-07-09",createdate:"2025-05-28"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2025-05-28"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2025-05-28"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-07-09",createdate:"2025-05-28"},
  {stage:"694",amt:30000,prob:0,won:false,lost:true,closedate:"2025-11-28",createdate:"2025-05-26"},
  {stage:"694",amt:15000,prob:0,won:false,lost:true,closedate:"2025-08-21",createdate:"2025-05-26"},
  {stage:"694",amt:15000,prob:0,won:false,lost:true,closedate:"2025-05-28",createdate:"2025-05-22"},
  {stage:"694",amt:15000,prob:0,won:false,lost:true,closedate:"2025-05-28",createdate:"2025-05-20"},
  {stage:"694",amt:15000,prob:0,won:false,lost:true,closedate:"2025-12-16",createdate:"2025-05-19"},
  {stage:"694",amt:80000,prob:0,won:false,lost:true,closedate:"2025-05-22",createdate:"2025-05-15"},
  {stage:"694",amt:40000,prob:0,won:false,lost:true,closedate:"2025-05-15",createdate:"2025-04-18"},
  {stage:"693",amt:18000,prob:1,won:true,lost:false,closedate:"2025-05-15",createdate:"2025-04-16"},
  {stage:"496",amt:5000,prob:0.1,won:false,lost:false,closedate:"2025-04-07",createdate:"2025-04-08"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-08-13",createdate:"2025-03-19"},
  {stage:"694",amt:112000,prob:0,won:false,lost:true,closedate:"2025-04-11",createdate:"2025-03-10"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2025-03-07"},
  {stage:"694",amt:30000,prob:0,won:false,lost:true,closedate:"2025-03-18",createdate:"2025-03-05"},
  {stage:"694",amt:50000,prob:0,won:false,lost:true,closedate:"2025-10-02",createdate:"2025-03-04"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2025-10-02",createdate:"2025-02-27"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2025-02-13"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2025-02-13"},
  {stage:"694",amt:60000,prob:0,won:false,lost:true,closedate:"2025-05-29",createdate:"2025-02-13"},
  {stage:"694",amt:1500,prob:0,won:false,lost:true,closedate:"2025-12-16",createdate:"2025-02-13"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2025-02-13"},
  {stage:"694",amt:100000,prob:0,won:false,lost:true,closedate:"2025-02-17",createdate:"2025-02-13"},
  {stage:"693",amt:80000,prob:1,won:true,lost:false,closedate:"2025-10-27",createdate:"2025-02-13"},
  {stage:"694",amt:10500,prob:0,won:false,lost:true,closedate:"2025-10-02",createdate:"2025-02-13"},
  {stage:"694",amt:100000,prob:0,won:false,lost:true,closedate:"2025-03-10",createdate:"2025-02-13"},
  {stage:"693",amt:7000,prob:1,won:true,lost:false,closedate:"2025-02-03",createdate:"2025-02-10"},
  {stage:"693",amt:80000,prob:1,won:true,lost:false,closedate:"2025-02-07",createdate:"2025-02-10"},
  {stage:"693",amt:2100,prob:1,won:true,lost:false,closedate:"2025-02-03",createdate:"2025-02-10"},
  {stage:"497",amt:40000,prob:0.2,won:false,lost:false,closedate:"2025-02-05",createdate:"2025-02-10"},
  {stage:"693",amt:10000,prob:1,won:true,lost:false,closedate:"2025-10-02",createdate:"2025-02-10"},
  {stage:"693",amt:10000,prob:1,won:true,lost:false,closedate:"2025-06-20",createdate:"2025-02-10"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2025-02-04"},
  {stage:"496",amt:20000,prob:0.1,won:false,lost:false,closedate:"2025-01-28",createdate:"2025-01-28"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2025-01-24"},
  {stage:"495",amt:30000,prob:0.02,won:false,lost:false,closedate:"2025-01-31",createdate:"2025-01-21"},
  {stage:"694",amt:93000,prob:0,won:false,lost:true,closedate:"2025-02-17",createdate:"2025-01-21"},
  {stage:"497",amt:18000,prob:0.2,won:false,lost:false,closedate:"2025-01-13",createdate:"2025-01-03"},
  {stage:"694",amt:20000,prob:0,won:false,lost:true,closedate:"2025-03-12",createdate:"2025-01-03"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-03-12",createdate:"2024-12-27"},
  {stage:"694",amt:2000,prob:0,won:false,lost:true,closedate:"2024-11-04",createdate:"2024-12-20"},
  {stage:"694",amt:7000,prob:0,won:false,lost:true,closedate:"2025-04-18",createdate:"2024-12-19"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-03-12",createdate:"2024-12-19"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-03-12",createdate:"2024-12-19"},
  {stage:"694",amt:25000,prob:0,won:false,lost:true,closedate:"2025-05-23",createdate:"2024-12-18"},
  {stage:"694",amt:90000,prob:0,won:false,lost:true,closedate:"2026-01-23",createdate:"2024-12-18"},
  {stage:"693",amt:40000,prob:1,won:true,lost:false,closedate:"2025-12-09",createdate:"2024-12-16"},
  {stage:"495",amt:5000,prob:0.02,won:false,lost:false,closedate:"2024-12-16",createdate:"2024-12-16"},
  {stage:"495",amt:30000,prob:0.02,won:false,lost:false,closedate:"2024-12-16",createdate:"2024-12-16"},
  {stage:"693",amt:20000,prob:1,won:true,lost:false,closedate:"2024-10-04",createdate:"2024-12-12"},
  {stage:"694",amt:300000,prob:0,won:false,lost:true,closedate:"2024-11-04",createdate:"2024-12-12"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-05-23",createdate:"2024-12-12"},
  {stage:"694",amt:150000,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2024-12-12"},
  {stage:"694",amt:76000,prob:0,won:false,lost:true,closedate:"2024-09-30",createdate:"2024-12-12"},
  {stage:"694",amt:90000,prob:0,won:false,lost:true,closedate:"2024-09-02",createdate:"2024-12-12"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-06-30",createdate:"2024-12-12"},
  {stage:"694",amt:150000,prob:0,won:false,lost:true,closedate:"2024-07-30",createdate:"2024-12-11"},
  {stage:"693",amt:15000,prob:1,won:true,lost:false,closedate:"2024-05-30",createdate:"2024-12-11"},
  {stage:"694",amt:19500,prob:0,won:false,lost:true,closedate:"2024-04-29",createdate:"2024-12-11"},
  {stage:"693",amt:7000,prob:1,won:true,lost:false,closedate:"2024-04-01",createdate:"2024-12-11"},
  {stage:"694",amt:20000,prob:0,won:false,lost:true,closedate:"2024-06-01",createdate:"2024-12-11"},
  {stage:"693",amt:7000,prob:1,won:true,lost:false,closedate:"2024-09-13",createdate:"2024-12-11"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2024-06-01",createdate:"2024-12-11"},
  {stage:"694",amt:50000,prob:0,won:false,lost:true,closedate:"2024-01-26",createdate:"2024-12-11"},
  {stage:"694",amt:20000,prob:0,won:false,lost:true,closedate:"2025-05-20",createdate:"2024-12-11"},
  {stage:"694",amt:20000,prob:0,won:false,lost:true,closedate:"2024-01-15",createdate:"2024-12-11"},
  {stage:"694",amt:30000,prob:0,won:false,lost:true,closedate:"2024-01-15",createdate:"2024-12-11"},
  {stage:"694",amt:150000,prob:0,won:false,lost:true,closedate:"2025-02-13",createdate:"2024-12-10"},
  {stage:"693",amt:85000,prob:1,won:true,lost:false,closedate:"2025-02-13",createdate:"2024-12-10"},
  {stage:"693",amt:80000,prob:1,won:true,lost:false,closedate:"2026-02-10",createdate:"2024-12-10"},
  {stage:"693",amt:38000,prob:1,won:true,lost:false,closedate:"2024-01-15",createdate:"2024-12-10"},
  {stage:"693",amt:150000,prob:1,won:true,lost:false,closedate:"2024-03-25",createdate:"2024-12-10"},
  {stage:"496",amt:30000,prob:0.1,won:false,lost:false,closedate:"2024-11-01",createdate:"2024-12-10"},
  {stage:"694",amt:30000,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2024-11-27"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2024-11-27"},
  {stage:"694",amt:30000,prob:0,won:false,lost:true,closedate:"2025-02-26",createdate:"2024-11-27"},
  {stage:"694",amt:200000,prob:0,won:false,lost:true,closedate:"2024-12-19",createdate:"2024-11-27"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2025-05-20",createdate:"2024-11-27"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2024-11-27"},
  {stage:"694",amt:7000,prob:0,won:false,lost:true,closedate:"2025-03-12",createdate:"2024-11-27"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2025-03-12",createdate:"2024-11-27"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-03-07",createdate:"2024-11-27"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2024-11-27"},
  {stage:"694",amt:57000,prob:0,won:false,lost:true,closedate:"2024-12-12",createdate:"2024-11-27"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2024-06-12",createdate:"2024-11-26"},
  {stage:"694",amt:20000,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2024-11-26"},
  {stage:"694",amt:40000,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2024-11-26"},
  {stage:"694",amt:20000,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2024-11-26"},
  {stage:"694",amt:30000,prob:0,won:false,lost:true,closedate:"2025-03-07",createdate:"2024-11-26"},
  {stage:"694",amt:100000,prob:0,won:false,lost:true,closedate:"2024-08-26",createdate:"2024-11-26"},
  {stage:"694",amt:80000,prob:0,won:false,lost:true,closedate:"2024-09-09",createdate:"2024-11-26"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2024-11-26"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2024-08-30",createdate:"2024-11-26"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2024-07-26",createdate:"2024-11-26"},
  {stage:"694",amt:5000,prob:0,won:false,lost:true,closedate:"2025-03-12",createdate:"2024-11-26"},
  {stage:"694",amt:20000,prob:0,won:false,lost:true,closedate:"2025-08-07",createdate:"2024-11-26"},
  {stage:"694",amt:20000,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2024-11-26"},
  {stage:"694",amt:10000,prob:0,won:false,lost:true,closedate:"2024-09-02",createdate:"2024-11-26"},
  {stage:"694",amt:25000,prob:0,won:false,lost:true,closedate:"2023-12-22",createdate:"2024-11-26"},
  {stage:"694",amt:0,prob:0,won:false,lost:true,closedate:"2025-02-21",createdate:"2024-11-26"},
  {stage:"694",amt:20000,prob:0,won:false,lost:true,closedate:"2024-03-15",createdate:"2024-11-26"},
  {stage:"694",amt:12500,prob:0,won:false,lost:true,closedate:"2024-03-15",createdate:"2024-11-26"},
  {stage:"694",amt:60000,prob:0,won:false,lost:true,closedate:"2024-12-10",createdate:"2024-11-26"},
  {stage:"694",amt:12500,prob:0,won:false,lost:true,closedate:"2025-03-19",createdate:"2024-11-26"},
];

const TODAY = new Date("2026-03-05");
const CY = 2026, PY = 2025;
const PIPE_STAGES = ["495","496","497","690","691"];
const STAGE_LABELS = {"495":"Introductory","496":"Prospect","497":"Qualified","690":"Opportunity"};
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function filterDeals(deals, period) {
  return deals.filter(d => {
    const refDate = new Date((d.won || d.lost) ? d.closedate : d.createdate);
    const y = refDate.getFullYear(), mo = refDate.getMonth();
    if (period === "MTD") return y === CY && mo === 2 && refDate <= TODAY;
    if (period === "YTD") return y === CY && refDate <= TODAY;
    if (period === "CUR") return y === CY;
    if (period === "PREV") return y === PY;
    return true;
  });
}

function computeMetrics(deals) {
  const pipe = deals.filter(d => PIPE_STAGES.includes(d.stage));
  const won = deals.filter(d => d.won), lost = deals.filter(d => d.lost);
  const pipeValue = pipe.reduce((s,d)=>s+d.amt,0);
  const weighted = pipe.reduce((s,d)=>s+d.amt*d.prob,0);
  const wonAmt = won.reduce((s,d)=>s+d.amt,0);
  const lostAmt = lost.reduce((s,d)=>s+d.amt,0);
  const total = won.length + lost.length;
  const winRatio = total > 0 ? (won.length/total)*100 : 0;
  const avgWon = won.length > 0 ? wonAmt/won.length : 0;
  const stageAgg = {}, stageCount = {};
  PIPE_STAGES.forEach(s=>{stageAgg[s]=0; stageCount[s]=0;});
  pipe.forEach(d=>{if(stageAgg[d.stage]!==undefined){stageAgg[d.stage]+=d.amt; stageCount[d.stage]++;}});
  const chartData = ["495","496","497","690"].map(s=>({name:STAGE_LABELS[s],value:stageAgg[s]||0,count:stageCount[s]||0}));
  return {pipeValue,weighted,totalInPipe:pipe.length,won:won.length,lost:lost.length,wonAmt,lostAmt,winRatio,avgWon,chartData};
}

function monthlyWon(deals, year) {
  const by = Array(12).fill(0);
  deals.filter(d=>d.won&&new Date(d.closedate).getFullYear()===year)
       .forEach(d=>{by[new Date(d.closedate).getMonth()]+=d.amt;});
  return MONTHS.map((m,i)=>({month:m,[year]:by[i]}));
}

function fmt(n){if(n>=1e6)return(n/1e6).toFixed(2)+"M€";if(n>=1e3)return(n/1e3).toFixed(0)+"K€";return n+"€";}
function fmtS(n){if(n>=1e6)return(n/1e6).toFixed(2)+"M";if(n>=1e3)return(n/1e3).toFixed(1)+"K";return String(n);}
function pctDiff(a,b){if(b===0)return a>0?"+∞%":"—";const p=((a-b)/b)*100;return(p>=0?"+":"")+p.toFixed(0)+"%";}
function pctCol(a,b){return a>=b?"#4ade80":"#f87171";}

function WinRing({ratio,size=100}){
  const st=9,r=(size-st)/2,circ=2*Math.PI*r,dash=(ratio/100)*circ;
  return(<svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth={st}/>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#fff" strokeWidth={st} strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round"/>
  </svg>);
}

const CTip = ({active,payload})=>active&&payload?.length?(<div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:6,padding:"8px 14px",color:"#0f172a",fontSize:13,boxShadow:"0 4px 12px rgba(0,0,0,.1)"}}>
  <b style={{display:"block",marginBottom:4}}>{payload[0].payload.name||payload[0].payload.month}</b>
  {payload.map((p,i)=><div key={i} style={{color:p.color||"#e74c3c"}}>{p.name==="value"?"Amount":p.name==="count"?"Deals":p.name}: {p.name==="value"?fmt(p.value):p.value}</div>)}
</div>):null;

export default function Dashboard() {
  const [period, setPeriod] = useState("ALL");
  const isYoY = period === "YoY";

  const deals = useMemo(()=>filterDeals(ALL_DEALS, isYoY ? "CUR" : period),[period]);
  const m = useMemo(()=>computeMetrics(deals),[deals]);
  const mPrev = useMemo(()=>computeMetrics(filterDeals(ALL_DEALS,"PREV")),[]);
  const displayM = m;
  const compareM = isYoY ? mPrev : null;

  const trendData = useMemo(()=>{
    const cur = monthlyWon(ALL_DEALS, CY);
    const prev = monthlyWon(ALL_DEALS, PY);
    return cur.map((c,i)=>({month:c.month,[CY]:c[CY],[PY]:prev[i][PY]}));
  },[]);

  const TABS = ["MTD","YTD","YoY","ALL","ACT"];
  const TLABELS = {MTD:"MTD · Mar 2026",YTD:"YTD · 2026",YoY:`YoY · ${PY} vs ${CY}`,ALL:"All Time",ACT:"Activities · Jan–Mar YTD"};

  // Activities data: new deals created/won/lost per month + notes (Jan-Mar 2026)
  const ACT_MONTHS = ["Jan","Feb","Mar"];
  const ACT_DATA = useMemo(()=>{
    const created=[0,0,0], won=[0,0,0], lost=[0,0,0];
    ALL_DEALS.forEach(d=>{
      const ct=new Date(d.createdate); if(ct.getFullYear()===CY&&ct.getMonth()<=2) created[ct.getMonth()]++;
      if(d.won){const cl=new Date(d.closedate);if(cl.getFullYear()===CY&&cl.getMonth()<=2)won[cl.getMonth()]++;}
      if(d.lost){const cl=new Date(d.closedate);if(cl.getFullYear()===CY&&cl.getMonth()<=2)lost[cl.getMonth()]++;}
    });
    return ACT_MONTHS.map((m,i)=>({month:m,"New Deals":created[i],"Won":won[i],"Lost":lost[i]}));
  },[]);

  return (
    <div style={{fontFamily:"'Open Sans',sans-serif",background:"#f1f5f9",minHeight:"100vh",padding:"16px 18px",color:"#0f172a"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;font-family:'Open Sans',sans-serif;}
        .tab{cursor:pointer;padding:8px 20px;border-radius:20px;font-size:14px;font-weight:700;letter-spacing:.3px;transition:all .15s;border:1.5px solid transparent;text-transform:uppercase;}
        .active{background:#e74c3c;color:#fff;border-color:#e74c3c;}
        .inactive{background:#fff;color:#64748b;border-color:#e2e8f0;}
        .inactive:hover{border-color:#e74c3c;color:#e74c3c;}
        .card{background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:16px 18px;box-shadow:0 1px 4px rgba(0,0,0,.06);}
        .badge{font-size:12px;font-weight:700;padding:3px 8px;border-radius:8px;margin-left:6px;}
      `}</style>

      {/* HEADER */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div>
          <h1 style={{margin:0,fontSize:30,fontWeight:800,letterSpacing:1,textTransform:"uppercase",fontFamily:"'Open Sans',sans-serif"}}>Sales Pipeline Dashboard</h1>
          <div style={{fontSize:14,color:"#64748b",marginTop:3,fontFamily:"'Open Sans',sans-serif"}}>HubSpot CRM · Default Pipeline · March 5, 2026</div>
        </div>
        <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="10" r="5" fill="#e74c3c"/><circle cx="10" cy="32" r="5" fill="#e74c3c"/><circle cx="34" cy="32" r="5" fill="#e74c3c"/>
          <line x1="22" y1="10" x2="10" y2="32" stroke="#e74c3c" strokeWidth="2.5"/>
          <line x1="22" y1="10" x2="34" y2="32" stroke="#e74c3c" strokeWidth="2.5"/>
          <line x1="10" y1="32" x2="34" y2="32" stroke="#e74c3c" strokeWidth="2.5"/>
        </svg>
      </div>

      {/* TABS */}
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        {TABS.map(t=>(
          <button key={t} className={`tab ${period===t?"active":"inactive"}`} onClick={()=>setPeriod(t)}>{TLABELS[t]}</button>
        ))}
      </div>

      {/* YoY TREND + KPI COMPARISON */}
      {isYoY && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
          <div className="card">
            <div style={{fontSize:13,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Won Revenue — {PY} vs {CY}</div>
            <ResponsiveContainer width="100%" height={170}>
              <LineChart data={trendData} margin={{top:4,right:6,left:-10,bottom:0}}>
                <XAxis dataKey="month" tick={{fontSize:12,fill:"#94a3b8"}} tickLine={false} axisLine={false}/>
                <YAxis tickFormatter={v=>v>=1000?(v/1000)+"K":v} tick={{fontSize:12,fill:"#94a3b8"}} tickLine={false} axisLine={false}/>
                <Tooltip content={<CTip/>}/>
                <Legend wrapperStyle={{fontSize:13,color:"#64748b"}}/>
                <Line type="monotone" dataKey={PY} stroke="#cbd5e1" strokeWidth={2} dot={false} strokeDasharray="4 3"/>
                <Line type="monotone" dataKey={CY} stroke="#e74c3c" strokeWidth={2.5} dot={{fill:"#e74c3c",r:3}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[
              {label:"Won Deals",cur:m.won,prev:mPrev.won,f:v=>v},
              {label:"Won Revenue",cur:m.wonAmt,prev:mPrev.wonAmt,f:fmt},
              {label:"Win Ratio",cur:m.winRatio,prev:mPrev.winRatio,f:v=>v.toFixed(1)+"%"},
              {label:"Avg Deal",cur:m.avgWon,prev:mPrev.avgWon,f:fmt},
            ].map(({label,cur,prev,f})=>(
              <div key={label} className="card">
                <div style={{fontSize:12,color:"#64748b",textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{label}</div>
                <div style={{fontSize:26,fontWeight:800,fontFamily:"'Open Sans',sans-serif",color:"#0f172a"}}>{f(cur)}</div>
                <div style={{fontSize:13,color:"#64748b",marginTop:3}}>
                  {PY}: {f(prev)}
                  <span className="badge" style={{background:cur>=prev?"rgba(74,222,128,.12)":"rgba(248,113,113,.12)",color:pctCol(cur,prev)}}>
                    {pctDiff(cur,prev)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVITIES VIEW */}
      {period==="ACT" && (
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {/* KPI summary strip */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
            {[
              {label:"New Deals Created",values:ACT_DATA.map(d=>d["New Deals"]),color:"#3b82f6",icon:"➕"},
              {label:"Deals Won",values:ACT_DATA.map(d=>d["Won"]),color:"#22c55e",icon:"✅"},
              {label:"Deals Lost",values:ACT_DATA.map(d=>d["Lost"]),color:"#ef4444",icon:"❌"},
            ].map(({label,values,color,icon})=>(
              <div key={label} className="card">
                <div style={{fontSize:12,color:"#64748b",textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>{icon} {label}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                  {ACT_MONTHS.map((m,i)=>(
                    <div key={m} style={{textAlign:"center",flex:1}}>
                      <div style={{fontSize:26,fontWeight:800,color,lineHeight:1}}>{values[i]}</div>
                      <div style={{fontSize:12,color:"#64748b",marginTop:3}}>{m}</div>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:8,fontSize:13,fontWeight:700,color:"#94a3b8"}}>
                  Total: <span style={{color}}>{values.reduce((a,b)=>a+b,0)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Grouped bar chart */}
          <div className="card">
            <div style={{fontSize:13,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Monthly Activity Breakdown — Jan to Mar 2026</div>
            <div style={{display:"flex",gap:20,marginBottom:10}}>
              {[["#3b82f6","New Deals"],["#22c55e","Won"],["#ef4444","Lost"]].map(([c,l])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#94a3b8"}}>
                  <div style={{width:12,height:12,borderRadius:2,background:c}}/>{l}
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ACT_DATA} margin={{top:10,right:10,left:-10,bottom:0}} barGap={4} barCategoryGap="30%">
                <XAxis dataKey="month" tick={{fontSize:13,fill:"#64748b"}} tickLine={false} axisLine={false}/>
                <YAxis tick={{fontSize:12,fill:"#64748b"}} tickLine={false} axisLine={false} allowDecimals={false}/>
                <Tooltip content={<CTip/>}/>
                <Bar dataKey="New Deals" fill="#3b82f6" radius={[4,4,0,0]} label={{position:"top",fontSize:12,fill:"#3b82f6",fontWeight:700}}/>
                <Bar dataKey="Won" fill="#22c55e" radius={[4,4,0,0]} label={{position:"top",fontSize:12,fill:"#22c55e",fontWeight:700}}/>
                <Bar dataKey="Lost" fill="#ef4444" radius={[4,4,0,0]} label={{position:"top",fontSize:12,fill:"#ef4444",fontWeight:700}}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion funnel */}
          <div className="card">
            <div style={{fontSize:13,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>YTD Conversion Funnel</div>
            <div style={{display:"flex",alignItems:"center",gap:0}}>
              {[
                {label:"Created",val:ACT_DATA.reduce((s,d)=>s+d["New Deals"],0),color:"#3b82f6",w:"100%"},
                {label:"Won",val:ACT_DATA.reduce((s,d)=>s+d["Won"],0),color:"#22c55e",w:"60%"},
                {label:"Lost",val:ACT_DATA.reduce((s,d)=>s+d["Lost"],0),color:"#ef4444",w:"80%"},
              ].map(({label,val,color,w},i)=>(
                <div key={label} style={{flex:1,padding:"0 8px",borderLeft:i>0?"1px solid rgba(255,255,255,.08)":"none"}}>
                  <div style={{fontSize:12,color:"#64748b",textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{label}</div>
                  <div style={{fontSize:34,fontWeight:800,color,lineHeight:1.1}}>{val}</div>
                  <div style={{marginTop:8,height:6,borderRadius:3,background:"rgba(255,255,255,.06)",overflow:"hidden"}}>
                    <div style={{height:"100%",width:w,background:color,borderRadius:3}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {period!=="ACT" && <>
      {/* MAIN ROW */}
      <div style={{display:"grid",gridTemplateColumns:"1.1fr 1fr 1fr",gap:12,marginBottom:12}}>

        {/* Bar + Line Combo Chart */}
        <div className="card">
          <div style={{fontSize:13,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>Pipeline by Stage</div>
          <div style={{display:"flex",gap:16,marginBottom:6}}>
            <div style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#64748b"}}>
              <div style={{width:12,height:12,borderRadius:2,background:"#dc2626"}}/>Amount (€)
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#64748b"}}>
              <div style={{width:20,height:2,background:"#2563eb",borderRadius:1}}/>Deal Count
            </div>
          </div>
          <ResponsiveContainer width="100%" height={175}>
            <ComposedChart data={displayM.chartData} margin={{top:20,right:30,left:-10,bottom:0}}>
              <XAxis dataKey="name" tick={{fontSize:11,fill:"#94a3b8"}} tickLine={false} axisLine={false}/>
              <YAxis yAxisId="left" tickFormatter={v=>v>=1000?(v/1000)+"K":v} tick={{fontSize:11,fill:"#94a3b8"}} tickLine={false} axisLine={false}/>
              <YAxis yAxisId="right" orientation="right" tick={{fontSize:11,fill:"#2563eb"}} tickLine={false} axisLine={false} width={24}/>
              <Tooltip content={<CTip/>}/>
              <Bar yAxisId="left" dataKey="value" radius={[4,4,0,0]} label={{position:"top",formatter:v=>v>0?fmt(v):"",fontSize:10,fill:"#dc2626",fontWeight:700}}>
                {displayM.chartData.map((_,i)=><Cell key={i} fill={["#fca5a5","#f87171","#ef4444","#dc2626"][i]}/>)}
              </Bar>
              <Line yAxisId="right" type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2.5} dot={{fill:"#2563eb",r:5,strokeWidth:0}} label={{position:"top",fontSize:12,fill:"#2563eb",fontWeight:700}}/>
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Pipe Card */}
        <div className="card" style={{background:"linear-gradient(135deg,#1d4ed8 0%,#2563eb 100%)",border:"none",color:"#fff"}}>
          <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Currently in Pipeline</div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <div style={{fontSize:13,lineHeight:2,color:"rgba(255,255,255,.7)"}}>
              {["Introductory","Prospect","Qualified","Opportunity"].map(s=>(
                <div key={s} style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:"rgba(255,255,255,.5)"}}/>
                  {s}
                </div>
              ))}
            </div>
            <div style={{width:68,height:68,borderRadius:"50%",background:"rgba(255,255,255,.1)",border:"2px solid rgba(255,255,255,.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <span style={{fontSize:30,fontWeight:800}}>{displayM.totalInPipe}</span>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:10}}>
            <div style={{fontSize:12,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:.5}}>Pipe Value</div>
            <div style={{fontSize:34,fontWeight:800,lineHeight:1.1,fontFamily:"'Open Sans',sans-serif"}}>{fmtS(displayM.pipeValue)}</div>
            <div style={{display:"flex",alignItems:"baseline",gap:5,marginTop:3}}>
              <span style={{fontSize:17,fontWeight:700}}>⚖ {fmtS(Math.round(displayM.weighted))}</span>
              <span style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>weighted</span>
            </div>
          </div>
        </div>

        {/* KPI Stack */}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[
            {label:"Avg Won Value",value:fmtS(Math.round(displayM.avgWon)),icon:"🏅",comp:compareM?fmtS(Math.round(compareM.avgWon)):null,raw:[displayM.avgWon,compareM?.avgWon]},
            {label:"Won Deals",value:displayM.won,icon:"✅",comp:compareM?compareM.won:null,raw:[displayM.won,compareM?.won]},
            {label:"Win Ratio",value:displayM.winRatio.toFixed(1)+"%",icon:"🎯",comp:compareM?compareM.winRatio.toFixed(1)+"%":null,raw:[displayM.winRatio,compareM?.winRatio]},
          ].map(({label,value,icon,comp,raw})=>(
            <div key={label} className="card" style={{flex:1,display:"flex",alignItems:"center",gap:12}}>
              <div style={{fontSize:28}}>{icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,color:"#64748b",textTransform:"uppercase",letterSpacing:.5}}>{label}</div>
                <div style={{fontSize:26,fontWeight:800,fontFamily:"'Open Sans',sans-serif",lineHeight:1.15,color:"#0f172a"}}>{value}</div>
                {comp && <div style={{fontSize:12,color:"#64748b",marginTop:2}}>
                  {PY}: {comp}
                  <span className="badge" style={{background:raw[0]>=raw[1]?"rgba(74,222,128,.12)":"rgba(248,113,113,.12)",color:pctCol(raw[0],raw[1])}}>
                    {pctDiff(raw[0],raw[1])}
                  </span>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WIN vs LOST BAR */}
      <div style={{background:"linear-gradient(135deg,#7f1d1d,#dc2626)",borderRadius:10,padding:"18px 26px",display:"flex",alignItems:"center",gap:0,flexWrap:"wrap"}}>
        <div style={{flex:"0 0 180px"}}>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:2,textTransform:"uppercase",opacity:.65,marginBottom:3,fontFamily:"'Open Sans',sans-serif"}}>Win vs Lost</div>
          <div style={{fontSize:12,opacity:.55,textTransform:"uppercase",letterSpacing:1}}>Deals</div>
          <div style={{fontSize:42,fontWeight:800,lineHeight:1.1,fontFamily:"'Open Sans',sans-serif"}}>
            {displayM.won}<span style={{opacity:.35}}>/{displayM.won+displayM.lost}</span>
          </div>
          {compareM && <div style={{fontSize:13,opacity:.65,marginTop:2}}>
            {PY}: {compareM.won}/{compareM.won+compareM.lost}
            <span className="badge" style={{background:displayM.won>=compareM.won?"rgba(74,222,128,.2)":"rgba(255,255,255,.1)",color:pctCol(displayM.won,compareM.won)}}>{pctDiff(displayM.won,compareM.won)}</span>
          </div>}
        </div>
        <div style={{width:1,height:65,background:"rgba(255,255,255,.2)",margin:"0 24px"}}/>
        <div style={{flex:"0 0 250px"}}>
          <div style={{fontSize:12,opacity:.55,textTransform:"uppercase",letterSpacing:1}}>Amount Won / Lost</div>
          <div style={{fontSize:28,fontWeight:800,lineHeight:1.1,fontFamily:"'Open Sans',sans-serif"}}>
            {(displayM.wonAmt/1e6).toFixed(3)}<span style={{opacity:.35}}>/{(displayM.lostAmt/1e6).toFixed(3)} M€</span>
          </div>
          <div style={{marginTop:8,height:5,borderRadius:3,background:"rgba(255,255,255,.2)",overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:3,width:`${displayM.wonAmt/(displayM.wonAmt+displayM.lostAmt||1)*100}%`,background:"#fff"}}/>
          </div>
          {compareM && <div style={{fontSize:13,opacity:.65,marginTop:4}}>
            {PY}: {(compareM.wonAmt/1e6).toFixed(3)}M€
            <span className="badge" style={{background:displayM.wonAmt>=compareM.wonAmt?"rgba(74,222,128,.2)":"rgba(255,255,255,.1)",color:pctCol(displayM.wonAmt,compareM.wonAmt)}}>{pctDiff(displayM.wonAmt,compareM.wonAmt)}</span>
          </div>}
        </div>
        <div style={{flex:1}}/>
        <div style={{textAlign:"center",position:"relative"}}>
          <div style={{fontSize:12,opacity:.55,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Win Ratio</div>
          <div style={{position:"relative",display:"inline-block"}}>
            <WinRing ratio={displayM.winRatio}/>
            <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,fontWeight:800,fontFamily:"'Open Sans',sans-serif"}}>
              {displayM.winRatio.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      </>
      }
      <div style={{marginTop:8,fontSize:12,color:"#94a3b8",textAlign:"right"}}>
        {period==="MTD"?"Filtered: deals created/closed in March 2026":period==="YTD"?"Filtered: deals created/closed in 2026":period==="YoY"?"Comparing full year 2025 vs 2026 (YTD)":period==="ACT"?"Activities based on deal create dates & notes logged (HubSpot CRM)":"All records in HubSpot CRM"}
      </div>
    </div>
  );
}
