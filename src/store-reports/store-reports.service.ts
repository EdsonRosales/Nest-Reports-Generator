import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { OrderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService {
  constructor(private readonly printerService: PrinterService) {}

  async getOrderByIdReport(orderId: string) {
    console.log({ orderId });
    const docDefinition = OrderByIdReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
