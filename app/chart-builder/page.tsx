'use client'
import React, { useState } from 'react';
import EChartsWrapper from '@/components/EChartsWrapper';
import type { EChartsOption } from 'echarts';

export default function ChartBuilderPage() {
  const [chartType, setChartType] = useState('line');
  const [chartData, setChartData] = useState({
    xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [120, 200, 150, 80, 70, 110, 130]
  });

  const [chartOption, setChartOption] = useState<EChartsOption>({
    title: { text: '示例图表' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'line' }]
  });

  // 更新图表类型
  const updateChartType = (type: string) => {
    setChartType(type);
    setChartOption(prev => ({
      ...prev,
      series: [{ ...(prev.series as any[])?.[0], type }]
    }));
  };

  // 更新数据
  const updateData = (index: number, value: number) => {
    const newData = [...chartData.series];
    newData[index] = value;
    setChartData({ ...chartData, series: newData });
    setChartOption(prev => ({
      ...prev,
      series: [{ ...(prev.series as any[])?.[0], data: newData }]
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">低代码ECharts图表构建器</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧配置面板 */}
        <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">图表配置</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">图表类型</label>
            <select 
              value={chartType} 
              onChange={(e) => updateChartType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="line">折线图</option>
              <option value="bar">柱状图</option>
              <option value="pie">饼图</option>
              <option value="scatter">散点图</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">数据编辑</label>
            {chartData.xAxis.map((label, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="w-20">{label}:</span>
                <input 
                  type="number" 
                  value={chartData.series[index]} 
                  onChange={(e) => updateData(index, Number(e.target.value))}
                  className="flex-1 p-1 border rounded"
                />
              </div>
            ))}
          </div>

          <button 
            onClick={() => {
              const newData = chartData.series.map(() => Math.floor(Math.random() * 200));
              setChartData({ ...chartData, series: newData });
              setChartOption(prev => ({
                ...prev,
                series: [{ ...(prev.series as any[])?.[0], data: newData }]
              }));
            }}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            生成随机数据
          </button>
        </div>

        {/* 右侧图表预览 */}
        <div className="lg:col-span-3">
          <div className="bg-white p-4 rounded-lg shadow">
            <EChartsWrapper option={chartOption} />
          </div>
          
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">当前配置</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(chartOption, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}