import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExportPaymentReportHandlers {
  public handleCsvStrategy(blob: Blob): void {
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'payments_report.csv';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }

  public handleHtmlStrategy(htmlString: string): void {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlString);
      newWindow.document.close();
    }
  }

  public handleJsonStrategy(data: any): void {
    const jsonString = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });

    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = downloadUrl;
    link.download = 'payments_report.json';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    console.log('JSON File successfully downloaded! Outstanding work.');
  }
}
