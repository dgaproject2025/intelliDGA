import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LogarithmicScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  LogarithmicScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const DornenburgChart = () => {
  const isDarkMode =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const textColor = isDarkMode ? '#cbd5e1' : '#1f75fe';
  const gridColor = isDarkMode
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(31, 117, 254, 0.1)';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'logarithmic',
        min: 0.001,
        max: 100,
        title: {
          display: true,
          text: 'C₂H₂ / C₂H₄',
          font: { size: 14, weight: 'bold' },
          color: textColor,
        },
        ticks: {
          color: textColor,
          callback: (value) => {
            const allowed = [0.001, 0.01, 0.1, 1, 10, 100];
            return allowed.includes(value) ? value : null;
          },
        },
        grid: { color: gridColor },
      },
      y: {
        type: 'logarithmic',
        min: 0.001,
        max: 100,
        title: {
          display: true,
          text: 'CH₄ / H₂',
          font: { size: 14, weight: 'bold' },
          color: textColor,
        },
        ticks: {
          color: textColor,
          callback: (value) => {
            const allowed = [0.001, 0.01, 0.1, 1, 10, 100];
            return allowed.includes(value) ? value : null;
          },
        },
        grid: { color: gridColor },
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Early Dornenburg Ratio Plot',
        font: { size: 16, weight: 'bold' },
        color: textColor,
        padding: { top: 10, bottom: 20 },
      },
      annotation: {
        annotations: {
          // UPDATED: Bar colors are now fixed to the original image's hex codes
          thermal: {
            type: 'box',
            xMin: 0.001,
            xMax: 0.75,
            yMin: 1,
            yMax: 100,
            backgroundColor: '#ec8b4f', // Original Orange
            label: {
              content: 'Thermal',
              enabled: true,
              position: 'center',
              font: { size: 18, weight: 'bold' },
              color: '#fff',
            },
          },
          arcing: {
            type: 'box',
            xMin: 0.75,
            xMax: 12,
            yMin: 0.1,
            yMax: 1,
            backgroundColor: '#f83a0a', // Original Red
            label: {
              content: 'Arcing',
              enabled: true,
              position: 'center',
              font: { size: 14, weight: 'bold' },
              color: '#fff',
            },
          },
          corona: {
            type: 'box',
            xMin: 0.1,
            xMax: 100,
            yMin: 0.001,
            yMax: 0.1,
            backgroundColor: '#edb650', // Original Yellow
            label: {
              content: 'Corona',
              enabled: true,
              position: 'center',
              font: { size: 14, weight: 'bold' },
              color: '#fff',
            },
          },
        },
      },
    },
  };

  const data = { datasets: [{ data: [] }] };

  return (
    <div className="p-6 bg-blue-900 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
      <div className="w-full h-96">
        <Scatter options={options} data={data} />
      </div>
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: '#ec8b4f' }}
          ></div>
          <span className="text-sm font-medium text-slate-300 dark:text-slate-300">
            Thermal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: '#f83a0a' }}
          ></div>
          <span className="text-sm font-medium text-slate-300 dark:text-slate-300">
            Arcing
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: '#edb650' }}
          ></div>
          <span className="text-sm font-medium text-slate-300 dark:text-slate-300">
            Corona
          </span>
        </div>
      </div>
    </div>
  );
};

export default DornenburgChart;
