import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent implements OnInit {
  @Input() food: any;
  selectedTable: any = null;

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController
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

  async goToOrderDetail() {
  const user = localStorage.getItem('loggedInUser');

  if (!user) {
    const alert = await this.alertController.create({
        header: 'Login Diperlukan',
        message: 'Silakan login atau daftar terlebih dahulu untuk melanjutkan checkout.',
        buttons: [
          {
            text: 'Login',
            role: 'login',
            handler: () => {
              this.router.navigate(['/login']);
            },
            cssClass: 'custom-orange' // 👉 kasih class ke tombol login
          },
          {
            text: 'Daftar',
            role: 'register',
            handler: () => {
              this.router.navigate(['/register']);
            },
            cssClass: 'custom-orange' // 👉 kasih class ke tombol daftar
          },
          {
            text: 'Batal',
            role: 'cancel',
            cssClass: 'custom-cancel' // 👉 class untuk tombol batal
          }
        ],
        cssClass: 'custom-alert' // 👉 class untuk alert container
      });

      await alert.present();
      return;
    }
// Kirim data selectedTable ke order-detail
  this.router.navigate(['/order-detail'], {
    state: {
      selectedTable: this.selectedTable
    }
  });
}
}
