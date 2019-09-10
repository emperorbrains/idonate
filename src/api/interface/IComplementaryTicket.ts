export default interface IComplementaryTicket {
  id: number;
  firstName: string;
  lastName: string;
  type: string;
  email: string;
  quantity: string | number;
  [key: string]: string | number;
}
