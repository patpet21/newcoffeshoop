'use client';

import CoffeeShopPlanner from "../components/planners/CoffeeShopPlanner";
import EquipmentPlanner from "../components/planners/EquipmentPlanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <CoffeeShopPlanner />
        <EquipmentPlanner />
      </div>
    </main>
  );
}