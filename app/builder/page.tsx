'use client';

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ChartGridBuilder from './components/ChartGridBuilder';

export default function BuilderPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              九宫格拖拽图表构建器
            </h1>
            <p className="text-gray-600">
              从左侧拖拽图表组件到九宫格中，构建您的数据可视化面板
            </p>
          </div>
          <ChartGridBuilder />
        </div>
      </div>
    </DndProvider>
  );
}