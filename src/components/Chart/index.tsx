import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: { labels: string[]; values: number[] };
  titleChart: string;
  type: 'bar' | 'line' | 'doughnut';
  legend?: boolean;
}

const Chart: React.FC<ChartProps> = ({ data, titleChart, type, legend = true }) => {
  const generateColors = (count: number) => {
    const randomPastelColor = () => {
      const hue = Math.floor(Math.random() * 360);
      const pastel = `hsl(${hue}, 70%, 80%)`;
      return pastel;
    };

    const colors = Array.from({ length: count }, () => randomPastelColor());
    return {
      backgroundColors: colors,
    };
  };

  const { backgroundColors } = generateColors(data.labels.length);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: type === 'line' ? 'rgba(0, 0, 0, 0)' : backgroundColors,
        borderWidth: 3,
        hoverOffset: 8,
        borderPadding:5,
        borderRadius: 3,
        fill: type === 'line' ? true : false,
        borderColor: type === 'line' ? 'rgb(75, 192, 192)' : 'white',
        tension: type === 'line' ? 0.3 : undefined,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: titleChart,
      },
      legend: {
        position: 'top' as const,
        display: legend,
      },
    },
    aspectRatio: 1.5,
  };

  switch (type) {
    case 'bar':
      return <Bar data={chartData} options={options} />;
    case 'line':
      return <Line data={chartData} options={options} />;
    case 'doughnut':
      return <Doughnut data={chartData} options={options} height={100} width={100} />;
    default:
      return <Doughnut data={chartData} options={options} height={100} width={100} />;
  }
};

export default Chart;
