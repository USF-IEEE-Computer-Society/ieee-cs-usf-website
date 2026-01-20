"use client";
import { useState } from 'react';
import MemberCard from '@/components/MemberCard';
import { eboard25fall } from '@/members_data/eboard-25-fall';
import { eboard26spring } from '@/members_data/eboard-26-spring';

const dataMap = {
  "fall25": eboard25fall,
  "spring26": eboard26spring,
};

export default function Page() {
  const [selectedYear, setSelectedYear] = useState("spring26");
  const currentList = dataMap[selectedYear as keyof typeof dataMap];

  return (
    <main className="min-h-screen pt-24 pb-12 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Meet the Team</h1>
          {/* Dropdown for year choosing */}
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 border border-gray-300 rounded-md bg-white text-gray-700"
          >
            <option value="spring26">Spring 2026</option>
            <option value="fall25">Fall 2025</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentList.map((member, index) => (
            <MemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </main>
  );
}
