import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { MENU_ITEMS } from  'src/app/data/menu';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
// pastikan path sesuai

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';
  greeting: string = '';

  items =  MENU_ITEMS;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private cartService: CartService,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.username = user.username;
    }

    this.setGreeting();
  }

  setGreeting() {
    const now = new Date();

    // Konversi ke Waktu Indonesia Barat (WIB)
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const wib = new Date(utc + 7 * 3600000); // UTC+7

    const hour = wib.getHours();

    if (hour >= 4 && hour < 11) {
      this.greeting = 'Selamat Pagi';
    } else if (hour >= 11 && hour < 15) {
      this.greeting = 'Selamat Siang';
    } else if (hour >= 15 && hour < 18) {
      this.greeting = 'Selamat Sore';
    } else {
      this.greeting = 'Selamat Malam';
    }
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
goToOrderPage() {
  this.navCtrl.navigateForward('/order');
}

}
