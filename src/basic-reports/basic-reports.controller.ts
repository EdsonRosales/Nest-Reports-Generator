import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello-World.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetterById(
    @Res() response: Response,
    @Param('employeeId') employeeId: string,
  ) {
    const pdfDoc =
      await this.basicReportsService.employmentLetterById(+employeeId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  // Country Report
  @Get('countries-report')
  async getCountriesReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.getCountries();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries-Report.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
