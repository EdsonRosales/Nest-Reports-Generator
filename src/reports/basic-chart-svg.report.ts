import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

export const getBasicChartSvgReport =
  async (): Promise<TDocumentDefinitions> => {
    return {
      content: [
        {
          // if you specify width, svg will scale proportionally
          svg: svgContent,
          width: 50,
        },
      ],
    };
  };
