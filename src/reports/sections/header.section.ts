import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

interface headerSectionOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: headerSectionOptions): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate
    ? {
        text: DateFormatter.formatDate(new Date()),
        alignment: 'right',
        margin: [20, 20],
      }
    : null;
  const headerTitle: Content = title
    ? {
        text: title,
        style: {
          bold: true,
        },
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
