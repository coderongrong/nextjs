'use client';

import React from 'react';
import { useDrag } from 'react-dnd';
import { ChartItem, ChartType } from './types';

const chartItems: ChartItem[] = [
  { type: 'line', name: '折线图', icon: '📈', color: 'bg-blue-100 border-blue-300' },
  { type: 'bar', name: '柱状图', icon: '📊', color: 'bg-green-100 border-green-300' },
  { type: 'pie', name: '饼图', icon: '🥧', color: 'bg-red-100 border-red-300' },
  { type: 'scatter', name: '散点图', icon: '🔵', color: 'bg-purple-100 border-purple-300' },
];

export default function ChartPalette() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-700">图表组件</h3>
      <p className="text-sm text-gray-500">拖拽图表到九宫格中</p>
      
      <div className="space-y-2">
        {chartItems.map((item) => (
          <DraggableChartItem key={item.type} item={item} />
        ))}
      </div>
    </div>
  );
}

function DraggableChartItem({ item }: { item: ChartItem }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'chart',
    item: { type: item.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`
        p-3 rounded-lg border-2 cursor-move transition-all duration-200
        ${item.color} 
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105 hover:shadow-md'}
      `}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{item.icon}</span>
        <div>
          <div className="font-medium text-gray-800">{item.name}</div>
          <div className="text-xs text-gray-500">拖拽到网格中</div>
        </div>
      </div>
    </div>
  );
}