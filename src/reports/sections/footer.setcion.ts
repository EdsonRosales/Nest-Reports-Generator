import { Alignment, Content, ContextPageSize } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
  pageSize?: ContextPageSize,
  alignment?: Alignment,
): Content => {
  return {
    text: `Página ${currentPage} de ${pageCount}`,
    alignment: alignment ?? 'right',
    fontSize: 12,
    bold: true,
    margin: [0, 10, 35, 0],
  };
};
