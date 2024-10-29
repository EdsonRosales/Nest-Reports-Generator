import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { countries as Country } from '@prisma/client';
import { footerSection } from './sections/footer.setcion';

interface CountryReportOptions {
  title?: string;
  subTitle?: string;
  countries: Country[];
}

export const getCountryReport = (
  options: CountryReportOptions,
): TDocumentDefinitions => {
  const { title, subTitle, countries } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries Report',
      subTitle: subTitle ?? 'List of Contries',
    }),
    footer: footerSection,
    pageMargins: [40, 115, 40, 60],
    content: [
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.continent,
              country.local_name,
            ]),

            ['', '', '', '', '', ``],
            [
              '',
              '',
              '',
              '',
              'Total',
              {
                text: `${countries.length} países`,
                bold: true,
              },
            ],
          ],
        },
      },

      // Total table
      {
        text: 'Totales',
        style: {
          fontSize: 20,
          bold: true,
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 60, '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Total de países',
                colSpan: 3,
                bold: true,
              },
              {},
              {},
              {
                text: `${countries.length} países`,
                bold: true,
              },
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
