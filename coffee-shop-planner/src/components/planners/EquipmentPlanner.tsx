'use client';

import React, { useState } from 'react';
import { Coffee, Plus, DollarSign, Trash2 } from 'lucide-react';

interface EquipmentItem {
  name: string;
  price: number;
  completed: boolean;
}

interface CategoryItems {
  [key: string]: EquipmentItem[];
}

export default function EquipmentPlanner() {
  const [equipmentItems, setEquipmentItems] = useState<CategoryItems>({
    'Barista Equipment': [
      { name: 'Espresso Machine', price: 0, completed: false },
      { name: 'Coffee Grinder', price: 0, completed: false },
      { name: 'Coffee Brewer', price: 0, completed: false }
    ],
    'Kitchen Equipment': [
      { name: 'Refrigerator', price: 0, completed: false },
      { name: 'Storage Racks', price: 0, completed: false }
    ]
  });

  const addNewItem = (category: string) => {
    setEquipmentItems(prev => ({
      ...prev,
      [category]: [...prev[category], { name: 'New Item', price: 0, completed: false }]
    }));
  };

  const updateItem = (category: string, index: number, updates: Partial<EquipmentItem>) => {
    setEquipmentItems(prev => ({
      ...prev,
      [category]: prev[category].map((item, i) => 
        i === index ? { ...item, ...updates } : item
      )
    }));
  };

  const deleteItem = (category: string, index: number) => {
    setEquipmentItems(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const calculateTotal = () => {
    return Object.values(equipmentItems).reduce((total, items) => 
      total + items.reduce((sum, item) => sum + (item.price || 0), 0), 0
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Coffee className="text-blue-600" />
        Equipment Planner
      </h1>

      {Object.entries(equipmentItems).map(([category, items]) => (
        <div key={category} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{category}</h2>
            <button
              onClick={() => addNewItem(category)}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(category, index, { name: e.target.value })}
                  className="flex-1 p-2 border rounded"
                />
                <div className="flex items-center gap-1">
                  <DollarSign size={16} />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(category, index, { price: parseFloat(e.target.value) || 0 })}
                    className="w-24 p-2 border rounded"
                  />
                </div>
                <button
                  onClick={() => deleteItem(category, index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6 pt-4 border-t">
        <div className="text-xl font-bold text-blue-600">
          Total: ${calculateTotal().toLocaleString()}
        </div>
      </div>
    </div>
  );
}
