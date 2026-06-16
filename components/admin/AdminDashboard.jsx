'use client'
// src/pages/EdutechDashboard.jsx
import React from "react";
import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell,
  AreaChart, Area,
} from "recharts";
import { FaUserGraduate, FaUserPlus, FaBookOpen, FaDollarSign } from "react-icons/fa";

/* ---------- DATA ---------- */
const STATS = [
  { title: "TOTAL STUDENTS", value: 3280, pct: 80, hint: "80% Increase in 20 Days", gradient: "from-[#6F52ED] to-[#7F35ED]", Icon: FaUserGraduate },
  { title: "NEW STUDENTS",   value: 245,  pct: 50, hint: "50% Increase in 25 Days", gradient: "from-[#FFA500] to-[#FF6B2B]", Icon: FaUserPlus },
  { title: "TOTAL COURSES",  value: 28,   pct: 76, hint: "76% Increase in 20 Days", gradient: "from-[#7A2BE2] to-[#B431F5]", Icon: FaBookOpen },
  { title: "FEES COLLECTION", value: "$25,160", pct: 30, hint: "30% Increase in 30 Days", gradient: "from-[#FF3B30] to-[#FF1F4B]", Icon: FaDollarSign },
];

const WEEKLY_ATTENDANCE = [
  { day: "S", attended: 68 }, { day: "M", attended: 48 }, { day: "T", attended: 75 },
  { day: "W", attended: 50 }, { day: "T", attended: 15 }, { day: "F", attended: 62 }, { day: "S", attended: 75 },
];

const COURSE_COMPLETION = [
  { name: "Completed", value: 380 },
  { name: "In Progress", value: 120 },
  { name: "Not Started", value: 60 },
];
const DONUT_COLORS = ["#16a34a", "#f59e0b", "#9ca3af"];

const ADMISSIONS_DROPOUTS = [
  { year: 2019, admissions: 420, dropouts: 60 },
  { year: 2020, admissions: 520, dropouts: 85 },
  { year: 2021, admissions: 680, dropouts: 100 },
  { year: 2022, admissions: 860, dropouts: 140 },
  { year: 2023, admissions: 740, dropouts: 120 },
  { year: 2024, admissions: 980, dropouts: 160 },
];

/* ---------- UI ---------- */
function StatCard({ title, value, pct, hint, gradient, Icon: IconCmp }) {
  return (
    <div className={`h-[140px] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] text-white p-6 bg-gradient-to-tr ${gradient} flex flex-col justify-between`}>
      <div className="text-[11px] font-semibold tracking-wider opacity-90">{title}</div>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 grid place-items-center rounded-full bg-white/20">
          {IconCmp ? <IconCmp className="text-white" /> : null}
        </div>
        <div className="text-3xl font-extrabold">{value}</div>
      </div>
      <div className="h-2 rounded-full bg-white/25">
        <div className="h-2 rounded-full bg-white" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-[11px] opacity-90">{hint}</div>
    </div>
  );
}

function ChartCard({ title, height = 320, children, footer }) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] min-w-0 overflow-hidden flex flex-col">
      <div className="px-6 py-3 text-sm font-semibold text-neutral-700 border-b border-neutral-100">{title}</div>
      <div className="p-4 grow" style={{ height }}>
        {children}
      </div>
      {footer ? <div className="px-5 pb-4">{footer}</div> : null}
    </div>
  );
}

const LegendDot = ({ color, label }) => (
  <span className="inline-flex items-center gap-1 text-xs text-neutral-600">
    <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />
    {label}
  </span>
);

/* ---------- PAGE ---------- */
export default function EdutechDashboard() {
  const totalCompletion = COURSE_COMPLETION.reduce((a, b) => a + b.value, 0);

  return (
    <div className="min-h-screen p-5 md:p-8 bg-neutral-100">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {STATS.map((s) => <StatCard key={s.title} {...s} />)}
      </div>

      {/* Charts row: Attendance wide; right column stacked */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        {/* Attendance (wide) */}
        <div className="xl:col-span-2 min-w-0">
          <ChartCard title="Weekly Attendance (%)" height={380}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={WEEKLY_ATTENDANCE}
                barSize={18}
                barCategoryGap={22}
                margin={{ top: 8, right: 12, left: -10, bottom: 0 }}
              >
                <CartesianGrid stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                <Bar dataKey="attended" fill="#3b82f6" radius={[6, 6, 0, 0]} background={{ fill: "#edf2ff" }} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Right column: Donut over Area (each gets full width & height) */}
        <div className="xl:col-span-1 min-w-0 flex flex-col gap-6">
          {/* Donut */}
          <ChartCard
            title="Course Completion"
            height={320}
            footer={
              <div className="flex justify-center gap-4">
                <LegendDot color={DONUT_COLORS[0]} label="Completed" />
                <LegendDot color={DONUT_COLORS[1]} label="In Progress" />
                <LegendDot color={DONUT_COLORS[2]} label="Not Started" />
              </div>
            }
          >
            <div className="relative h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={COURSE_COMPLETION}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="65%"
                    outerRadius="90%"
                    paddingAngle={2}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {COURSE_COMPLETION.map((_, i) => (
                      <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center leading-tight">
                  <div className="text-xs text-neutral-500">Total Students</div>
                  <div className="text-2xl font-bold">{totalCompletion}</div>
                </div>
              </div>
            </div>
          </ChartCard>

          {/* Area */}
          
        </div>
      </div>
    </div>
  );
}
