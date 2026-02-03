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
    <main className="min-h-screen pt-16 pb-12 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Meet the Team</h1>
          {/* Dropdown for year choosing */}
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 border border-gray-300 rounded-md bg-white text-gray-700"
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
