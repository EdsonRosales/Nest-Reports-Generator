import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';
import { footerSection } from './sections/footer.setcion';
import type { CompleteOrderData } from 'src/interfaces';

type OrderByIdReportOptions = {
  title?: string;
  subtitle?: string;
  data: CompleteOrderData;
};

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

export const OrderByIdReport = (
  options: OrderByIdReportOptions,
): TDocumentDefinitions => {
  const { data } = options;
  const { customers, order_details, order_date, order_id } = data;

  const subTotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );

  const total = subTotal * 1.15;

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
              { text: `Invoice No. ${order_id}\n`, bold: true },
              `Date: ${DateFormatter.formatDate(order_date)}\nDue Date: ${DateFormatter.formatDate(new Date())}\n`,
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
          `Razón Social: ${customers.customer_name},
          ${customers.city},
          ${customers.address}`,
        ],
      },

      // Details order table
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Description', 'Qty', 'Price', 'Total'],

            ...order_details.map((orderDetail) => [
              orderDetail.order_detail_id.toString(),
              orderDetail.products.product_name,
              orderDetail.quantity.toString(),
              {
                text: CurrencyFormatter.formatCurrency(
                  +orderDetail.products.price,
                ),
                alignment: 'right',
              },
              {
                text: CurrencyFormatter.formatCurrency(
                  +orderDetail.products.price * orderDetail.quantity,
                ),
                alignment: 'right',
              },
            ]),
          ],
        },
      },

      // line break
      '\n\n',

      // Total
      {
        columns: [
          {
            width: '*',
            text: ' ',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
