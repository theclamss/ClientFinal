import {OrderProduct} from './orderProduct';

export class Order {
  id: number;
  totalPrice: number;
  products: OrderProduct[];
  userId: number;
  date: Date;
  deliveryDate: Date;
  status : String;


  constructor(totalPrice: number, products: OrderProduct[], userId: number,status? :string) {
    this.totalPrice = totalPrice;
    this.products = products;
    this.userId = userId;
    this.status=status;
    if(status)
    status =status;
    else 
    status="WAITING";
  }

  
}
