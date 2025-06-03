import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent implements OnInit {
  @Input() food: any;

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    // Set jumlah awal dari keranjang kalau ada
    const existing = this.cartService.getCartItems().find(i => i.id === this.food.id);
    this.food.count = existing?.qty ?? 0;
  }

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

  goToOrderDetail() {
    // Tambahkan minimal 1 item jika belum ada
    if (!this.food.count || this.food.count <= 0) {
      this.cartService.addItemToCart(this.food);
      this.food.count = 1;
    }

    // Gunakan orderType dari service (sudah diset sebelumnya di dine-in.page.ts)
    const orderType = this.cartService.getOrderType();
    console.log('Order type:', orderType);

    // Tutup modal lalu navigasi
    this.modalController.dismiss().then(() => {
      this.router.navigate(['/order-detail']);
    });
  }
}
