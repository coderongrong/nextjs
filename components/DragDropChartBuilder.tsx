'use client'
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EChartsWrapper from './EChartsWrapper';
import type { EChartsOption } from 'echarts';

interface ChartComponent {
  id: string;
  type: 'line' | 'bar' | 'pie';
  data: number[];
}

const ChartItem: React.FC<{ type: string; onDrop: (type: string) => void }> = ({ type, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'chart',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 border rounded cursor-move mb-2 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {type} 图表
    </div>
  );
};

const DropZone: React.FC<{ onDrop: (type: string) => void }> = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'chart',
    drop: (item: { type: string }) => onDrop(item.type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 border-2 border-dashed rounded min-h-32 ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      拖拽图表到这里
    </div>
  );
};

export default function DragDropChartBuilder() {
  const [components, setComponents] = useState<ChartComponent[]>([]);

  const handleDrop = (type: string) => {
    const newComponent: ChartComponent = {
      id: Date.now().toString(),
      type: type as 'line' | 'bar' | 'pie',
      data: [120, 200, 150, 80, 70, 110, 130]
    };
    setComponents([...components, newComponent]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">拖拽图表构建器</h2>
        
        <div className="grid grid-cols-3 gap-6">
          {/* 左侧组件库 */}
          <div>
            <h3 className="font-semibold mb-2">图表组件</h3>
            <ChartItem type="line" onDrop={handleDrop} />
            <ChartItem type="bar" onDrop={handleDrop} />
            <ChartItem type="pie" onDrop={handleDrop} />
          </div>

          {/* 中间画布 */}
          <div className="col-span-2">
            <DropZone onDrop={handleDrop} />
            {components.map(comp => (
              <div key={comp.id} className="mt-4">
                <EChartsWrapper option={{
                  series: [{ type: comp.type, data: comp.data }]
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}