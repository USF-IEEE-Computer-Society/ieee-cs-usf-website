"use client";
import { useState } from 'react';
import MemberCard from '@/app/components/MemberCard';
import { eboard24fall, eboard25spring, eboard25fall, eboard26spring } from '../data';

const dataMap = {
  "fall24": eboard24fall,
  "spring25": eboard25spring,
  "fall25": eboard25fall,
  "spring26": eboard26spring,
};

export default function PeopleClient() {
  const [selectedYear, setSelectedYear] = useState("spring26");
  const currentList = dataMap[selectedYear as keyof typeof dataMap];

  return (
    <main className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-14">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-2 block">
              Leadership
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Meet the Team
            </h1>
          </div>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-surface border border-borderStrong text-foreground font-display text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ieeeOrange/40 transition-all cursor-pointer"
          >
            <option value="spring26">Spring 2026</option>
            <option value="fall25">Fall 2025</option>
            <option value="spring25">Spring 2025</option>
            <option value="fall24">Fall 2024</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {currentList.map((member, index) => (
            <MemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </main>
  );
}
