export interface PaymentEntity{
  id?:string,
  date:Date,
  type:string,
  amount:number,
  changeType:number,
  finalAmout?:number,
  description?:string,
  invoiceId?:string,
}
