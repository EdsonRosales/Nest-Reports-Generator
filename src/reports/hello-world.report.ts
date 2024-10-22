import type { TDocumentDefinitions } from 'pdfmake/interfaces';

interface getHelloWorldReportParams {
  name: string;
}

export const getHelloWorldReport = (
  options: getHelloWorldReportParams,
): TDocumentDefinitions => {
  const { name } = options;

  const docDefinition: TDocumentDefinitions = {
    content: [`Hello ${name}!`],
  };

  return docDefinition;
};
