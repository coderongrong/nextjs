export type ChartType = 'line' | 'bar' | 'pie' | 'scatter';

export interface ChartConfig {
  id: string;
  type: ChartType | null;
  data: any;
  config: any;
}

export interface ChartItem {
  type: ChartType;
  name: string;
  icon: string;
  color: string;
}