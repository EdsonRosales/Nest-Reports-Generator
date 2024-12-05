import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generateChartImage = async () => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'], // Set X-axis labels
      datasets: [
        {
          label: 'Mi Primer Gráfico', // Create the 'Users' dataset
          data: [120, 65, 59, 81, 56, 55, 10], // Add data to the chart
          backgroundColor: 'rgba(54, 162, 235, 0.2)', // Set color
          borderColor: 'rgb(81, 75, 192)', // Set border color
          borderWidth: 1, // Set border
        },
      ],
    },
  };
  return Utils.chartJsToImage(chartConfig);
};

export const getBasicChartSvgReport =
  async (): Promise<TDocumentDefinitions> => {
    const chartImage = await generateChartImage();

    return {
      content: [
        {
          // if you specify width, svg will scale proportionally
          svg: svgContent,
          width: 100,
          fit: [100, 100],
        },
        {
          image: chartImage,
          width: 100,
          height: 100,
        },
      ],
    };
  };
