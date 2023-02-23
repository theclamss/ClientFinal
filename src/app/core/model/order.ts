import {OrderProduct} from './orderProduct';

export class Order {
  id: number;
  totalPrice: number;
  products: OrderProduct[];
  userId: number;
  date: Date;
  deliveryDate: Date;
  status : String;
  dateDeLivraisonClient :Date;


  constructor(totalPrice: number, products: OrderProduct[], userId: number,dely ?:Date,status? :string) {
    this.dateDeLivraisonClient=dely;
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
