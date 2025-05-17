import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { MENU_ITEMS } from  'src/app/data/menu';
import { LoadingController } from '@ionic/angular';
// pastikan path sesuai

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';

  items =  MENU_ITEMS;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private cartService: CartService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.username = user.username;
    }
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
async logout() {
  const loading = await this.loadingController.create({
    message: 'logging out...',
    duration: 500,
    spinner: 'dots',
    cssClass: 'custom-loading'
  });
  await loading.present();

  setTimeout(() => {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }, 2000);
}

goToReservasi() {
    this.router.navigate(['/reservasi']);
  }


}
