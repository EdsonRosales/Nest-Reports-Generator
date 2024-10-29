import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 30],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0],
  },
};

export const OrderByIdReport = (): TDocumentDefinitions => {
  return {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    content: [
      {
        text: 'Tucan Code',
        style: 'header',
      },
      {
        columns: [
          {
            text: '15 Montgomery St, Suite 600, \nSan Francisco, CA 94104, USA\nBN: 123456789\nTel: +1 415 123 4567',
          },
          {
            text: `Invoice No. 123456\nDate: ${DateFormatter.formatDate(new Date())}\nDue Date: ${DateFormatter.formatDate(new Date())}\n`,
            alignment: 'right',
          },
        ],
      },
    ],
  };
};
