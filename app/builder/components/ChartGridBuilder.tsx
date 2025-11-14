'use client';

import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import ChartPalette from './ChartPalette';
import ChartCell from './ChartCell';
import { ChartConfig, ChartType } from './types';

const GRID_SIZE = 3; // 3x3 九宫格

const defaultCharts: ChartConfig[] = Array(GRID_SIZE * GRID_SIZE).fill(null).map((_, index) => ({
  id: `cell-${index}`,
  type: null,
  data: null,
  config: null
}));

export default function ChartGridBuilder() {
  const [charts, setCharts] = useState<ChartConfig[]>(defaultCharts);

  const [, drop] = useDrop({
    accept: 'chart',
    drop: (item: { type: ChartType }, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (!offset) return;

      // 计算拖拽位置对应的网格索引
      const cellSize = 200; // 每个单元格大小
      const col = Math.floor(offset.x / cellSize);
      const row = Math.floor(offset.y / cellSize);
      const index = row * GRID_SIZE + col;

      if (index >= 0 && index < GRID_SIZE * GRID_SIZE) {
        setCharts(prev => {
          const newCharts = [...prev];
          newCharts[index] = {
            id: `chart-${Date.now()}`,
            type: item.type,
            data: generateSampleData(item.type),
            config: getDefaultConfig(item.type)
          };
          return newCharts;
        });
      }
    },
  });

  const clearCell = (index: number) => {
    setCharts(prev => {
      const newCharts = [...prev];
      newCharts[index] = {
        id: `cell-${index}`,
        type: null,
        data: null,
        config: null
      };
      return newCharts;
    });
  };

  return (
    <div className="flex gap-6">
      {/* 左侧图表面板 */}
      <div className="w-64">
        <ChartPalette />
      </div>

      {/* 九宫格布局 */}
      <div 
        ref={drop}
        className="flex-1 grid grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-md"
        style={{ 
          width: GRID_SIZE * 200 + (GRID_SIZE - 1) * 16,
          height: GRID_SIZE * 200 + (GRID_SIZE - 1) * 16
        }}
      >
        {charts.map((chart, index) => (
          <ChartCell
            key={chart.id}
            chart={chart}
            index={index}
            onClear={() => clearCell(index)}
          />
        ))}
      </div>
    </div>
  );
}

// 生成示例数据
function generateSampleData(type: ChartType) {
  switch (type) {
    case 'line':
      return {
        xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        series: [{ data: [120, 200, 150, 80, 70, 110, 130] }]
      };
    case 'bar':
      return {
        xAxis: { data: ['产品A', '产品B', '产品C', '产品D', '产品E'] },
        series: [{ data: [120, 200, 150, 80, 70] }]
      };
    case 'pie':
      return {
        series: [{
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }]
      };
    case 'scatter':
      return {
        xAxis: {},
        yAxis: {},
        series: [{
          data: [
            [10.0, 8.04], [8.07, 6.95], [13.0, 7.58], [9.05, 8.81],
            [11.0, 8.33], [14.0, 7.66], [13.4, 6.81], [10.0, 6.33]
          ]
        }]
      };
    default:
      return null;
  }
}

// 获取默认配置
function getDefaultConfig(type: ChartType) {
  const baseConfig = {
    title: { text: `${getChartName(type)}图表`, left: 'center' },
    tooltip: { trigger: 'axis' },
    grid: { top: '15%', right: '5%', bottom: '15%', left: '5%' }
  };

  switch (type) {
    case 'line':
      return {
        ...baseConfig,
        xAxis: { type: 'category' },
        yAxis: { type: 'value' }
      };
    case 'bar':
      return {
        ...baseConfig,
        xAxis: { type: 'category' },
        yAxis: { type: 'value' }
      };
    case 'pie':
      return {
        ...baseConfig,
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' }
      };
    case 'scatter':
      return {
        ...baseConfig,
        xAxis: { type: 'value' },
        yAxis: { type: 'value' }
      };
    default:
      return baseConfig;
  }
}

function getChartName(type: ChartType) {
  const names = {
    line: '折线',
    bar: '柱状',
    pie: '饼',
    scatter: '散点'
  };
  return names[type] || '图表';
}