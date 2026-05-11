export interface InvoiceEntity{
  id?:string;
  amount: number;
  date: Date;
  item: any[];
  state?:string;
  clientName?:string;
}
