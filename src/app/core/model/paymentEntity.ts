export interface PaymentEntity{
  id?:string,
  date:Date,
  type:string,
  amount:number,
  changeType:number,
  description?:string,
  invoiceId?:string,
}
