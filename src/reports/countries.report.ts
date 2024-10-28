import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { countries as Country } from '@prisma/client';

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
          ],
        },
      },
    ],
  };
};
