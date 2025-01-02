'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Coffee, Clock, AlertCircle } from 'lucide-react';

export default function CoffeeShopPlanner() {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [completedTasks, setCompletedTasks] = useState<{[key: string]: boolean}>({});

  const timelineSections = {
    'Initial Planning': {
      timeline: 'Pre-planning phase',
      tasks: [
        'Write a coffee shop business plan',
        'Create industry analysis',
        'Develop marketing plan',
        'Create operations plan',
        'Set goals',
        'Create budget'
      ]
    },
    'Location & Licenses': {
      timeline: '9-12 months before opening',
      tasks: [
        'Research location',
        'Secure location',
        'Obtain business license',
        'Get food service license',
        'Get health permits'
      ]
    },
    'Equipment & Setup': {
      timeline: '6 months before opening',
      tasks: [
        'Purchase equipment',
        'Order furniture',
        'Set up POS system',
        'Install signage',
        'Design interior'
      ]
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleTask = (section: string, taskIndex: number) => {
    const taskKey = `${section}-${taskIndex}`;
    setCompletedTasks(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  const calculateProgress = (section: string) => {
    const tasks = timelineSections[section].tasks;
    const completed = tasks.filter((_, index) => 
      completedTasks[`${section}-${index}`]
    ).length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        <Coffee className="text-blue-600" />
        Coffee Shop Planning Dashboard
      </h1>

      {Object.entries(timelineSections).map(([section, { timeline, tasks }]) => (
        <div key={section} className="mb-6 border rounded-lg overflow-hidden">
          <div 
            className="bg-gray-50 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100"
            onClick={() => toggleSection(section)}
          >
            <div className="flex items-center gap-4 flex-1">
              <Clock className="text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{section}</h2>
                <p className="text-sm text-gray-600">{timeline}</p>
              </div>
              <div className="ml-4 flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${calculateProgress(section)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {calculateProgress(section)}%
                </span>
              </div>
            </div>
            {expandedSections[section] ? 
              <ChevronUp className="text-gray-600" /> : 
              <ChevronDown className="text-gray-600" />
            }
          </div>

          {expandedSections[section] && (
            <div className="p-4">
              {tasks.map((task, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded px-2"
                >
                  <button
                    onClick={() => toggleTask(section, index)}
                    className={`w-5 h-5 rounded flex items-center justify-center border
                      ${completedTasks[`${section}-${index}`] ? 
                        'bg-blue-600 border-blue-600' : 
                        'border-gray-300'}`}
                  >
                    {completedTasks[`${section}-${index}`] && (
                      <Check className="text-white w-4 h-4" />
                    )}
                  </button>
                  <span className={`flex-1 ${completedTasks[`${section}-${index}`] ? 
                    'text-gray-400 line-through' : 
                    'text-gray-700'}`}>
                    {task}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="mt-8 p-4 bg-blue-50 rounded-lg flex items-center gap-3">
        <AlertCircle className="text-blue-600" />
        <p className="text-sm text-blue-800">
          Click on each section to expand and check off completed tasks.
        </p>
      </div>
    </div>
  );
}