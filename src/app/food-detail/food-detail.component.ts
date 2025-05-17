import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CartService } from '../service/cart.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent {
  @Input() food: any;

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private router: Router
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  increment() {
    this.cartService.addItemToCart(this.food);
    const cartItem = this.cartService.getCartItems().find(i => i.id === this.food.id);
    this.food.count = cartItem?.qty ?? 1;
  }

  decrement() {
    if (this.food.count > 0) {
      this.cartService.decreaseItemQty(this.food);
      const cartItem = this.cartService.getCartItems().find(i => i.id === this.food.id);
      this.food.count = cartItem?.qty ?? 0;
    }
  }

  getTotalItems(): number {
    return this.cartService.getCartItems()
      .reduce((sum, item) => sum + item.qty, 0);
  }

  goToOrderDetail() {
    this.cartService.setOrderType('Dine In'); // Atur sesuai kebutuhan
    this.modalController.dismiss(); // Tutup modal dulu
    this.router.navigate(['/order-detail']); // Pindah ke halaman order detail
  }
}
