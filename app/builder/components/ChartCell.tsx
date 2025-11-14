'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ChartConfig } from './types';

interface ChartCellProps {
  chart: ChartConfig;
  index: number;
  onClear: () => void;
}

export default function ChartCell({ chart, index, onClear }: ChartCellProps) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;

  if (!chart.type) {
    return (
      <div className={`
        w-full h-48 border-2 border-dashed border-gray-300 rounded-lg
        flex items-center justify-center bg-gray-50
        hover:border-gray-400 transition-colors
      `}>
        <div className="text-center">
          <div className="text-2xl text-gray-400 mb-2">+</div>
          <div className="text-sm text-gray-500">拖拽图表到这里</div>
          <div className="text-xs text-gray-400 mt-1">{row}行{col}列</div>
        </div>
      </div>
    );
  }

  const option = {
    ...chart.config,
    series: chart.data?.series ? chart.data.series.map((s: any) => ({
      ...s,
      type: chart.type
    })) : []
  };

  if (chart.data?.xAxis) {
    option.xAxis = chart.data.xAxis;
  }

  return (
    <div className="relative w-full h-48 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* 图表标题栏 */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
        <span className="text-sm font-medium text-gray-700">
          {chart.config?.title?.text || `图表 ${row}-${col}`}
        </span>
        <button
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
        >
          清除
        </button>
      </div>
      
      {/* 图表内容 */}
      <div className="h-36">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  );
}