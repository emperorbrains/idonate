export default interface IEventOrderTransaction {
  status: string;
  processedAt: string | Date;
  ticketSales: number;
  grossProceeds: number;
  netProceeds: number;
}
