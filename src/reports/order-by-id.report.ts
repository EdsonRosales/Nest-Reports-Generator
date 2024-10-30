import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';
import { footerSection } from './sections/footer.setcion';

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
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export const OrderByIdReport = (): TDocumentDefinitions => {
  return {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    footer: footerSection,
    content: [
      // Header
      {
        text: 'Tucan Code',
        style: 'header',
      },

      // Address & Invoice Details
      {
        columns: [
          {
            text: '15 Montgomery St, Suite 600, \nSan Francisco, CA 94104, USA\nBN: 123456789\nTel: +1 415 123 4567',
          },
          {
            text: [
              { text: 'Invoice No. 123456\n', bold: true },
              `Date: ${DateFormatter.formatDate(new Date())}\nDue Date: ${DateFormatter.formatDate(new Date())}\n`,
            ],
            alignment: 'right',
          },
        ],
      },

      // QR Code
      { qr: 'https://google.com', fit: 75, alignment: 'right' },

      // Client Direction
      {
        text: [
          { text: 'Bill To: \n', style: 'subHeader' },
          `Razón Social: Richter Supermarkt
          Michael Holz
          Grenzacherweg 237`,
        ],
      },
    ],
  };
};