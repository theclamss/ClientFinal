import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../core/services/tokenService/token-storage.service';
import {User} from '../core/model/user';
import {OrderService} from '../core/services/orderService/order.service';
import {OrderProductsService} from '../core/services/orderProductsService/order-products.service';
import {Order} from '../core/model/order';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  user: User;
  orderList: Order[];
  


  selectedOrder: Order[];
  displayedColumns: string[] = [ 'name', 'quantity', 'price'];
  OrderProductsService: any;
  userService: any;

  constructor(private tokenService: TokenStorageService, private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    // this.orderService.findOrdersByUserId(this.user.id).subscribe(result => this.orders = result);
    this.getSortOrders();


  }
  onNgModelChange(selectedOrder: any){
    console.log(selectedOrder[0].status);

    this.selectedOrder = selectedOrder;
    
    console.log(this.selectedOrder[0].totalPrice);
  
     

    
  }
  getSortOrders(){
    this.orderService.findOrdersByUserId(this.user.id).subscribe(data => this.orderList = data.sort((a, b) => +new Date(b.date) - +new Date(a.date)));
  }
}
