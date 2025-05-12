import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../cart.service'; // pastikan path sesuai

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';

  items = [
    {
      id: 'burger',
      name: 'BURGER',
      img: 'assets/makanan/burger.jpg',
      time: '30 min',
      sold: '200',
      count: 0,
      category: 'special' // ← tambahkan kategori agar bisa difilter nanti
    },
    {
      id: 'pizza',
      name: 'PIZZA',
      img: 'assets/makanan/pizza.jpg',
      time: '30 min',
      sold: '200',
      count: 0,
      category: 'combo'
    },
    {
      id: 'chicken',
      name: 'AYAM KRIUK',
      img: 'assets/makanan/chiken.jpg',
      time: '30 min',
      sold: '200',
      count: 0,
      category: 'nasi-goreng'
    },
    {
      id: 'spageti',
      name: 'SPAGETI',
      img: 'assets/makanan/spageti.jpg',
      time: '30 min',
      sold: '200',
      count: 0,
      category: 'special'
    }
  ];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.username = user.username;
    }
  }

  increment(id: string) {
    const item = this.items.find(i => i.id === id);
    if (item) item.count++;
  }

  decrement(id: string) {
    const item = this.items.find(i => i.id === id);
    if (item && item.count > 0) item.count--;
  }

  async presentOrderType(item: any) {
    const alert = await this.alertController.create({
      header: 'Select Order Type',
      message: `Choose order type for:${item.name}`,
      buttons: [
        {
          text: 'DINE IN',
          handler: () => {
            this.cartService.setOrderType('dine-in');
            this.cartService.addItemToCart(item);
            this.router.navigate(['/dine-in'], {
              state: {
                item: item,
                category: item.category // ← kirim kategori
              }
            });
          }
        },
        {
          text: 'TAKE AWAY',
          handler: () => {
            this.cartService.setOrderType('take-away');
            this.cartService.addItemToCart(item);
            this.router.navigate(['/take-away']);
          }
        },
        {
          text: 'CANCEL',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }
}
