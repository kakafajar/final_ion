import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ActionSheetButton } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
})
export class OrderDetailPage {
  items: any[] = [];
  orderType: string = '';
  selectedPaymentMethod: string = '';
  showPaymentOptions: boolean = false;

  constructor(private cartService: CartService) {}

  ionViewWillEnter() {
    this.items = this.cartService.getCartItems();
    this.orderType = this.cartService.getOrderType();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }
    paymentOptions: ActionSheetButton[] = [
    {
      text: 'Cash',
      handler: () => {
        this.selectedPaymentMethod = 'Cash';
      }
    },
    {
      text: 'Debit Card',
      handler: () => {
        this.selectedPaymentMethod = 'Debit Card';
      }
    },
    {
      text: 'QRIS',
      handler: () => {
        this.selectedPaymentMethod = 'QRIS';
      }
    },
    {
      text: 'Cancel',
      role: 'cancel'
    }
  ];

  openPaymentOptions() {
    this.showPaymentOptions = true;
  }

}
