import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  standalone:false,
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  identifier = ''; // Bisa email atau no HP
  password = '';

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const foundUser = users.find((user: any) =>
      (user.email === this.identifier || user.phone === this.identifier) &&
      user.password === this.password
    );

    if (foundUser) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser)); // Simpan user lengkap
      localStorage.setItem('username', foundUser.username); // Simpan username saja jika perlu

      const toast = await this.toastController.create({
        message: 'Login berhasil!',
        duration: 2000,
        color: 'success',
      });
      await toast.present();

      this.navCtrl.navigateForward('/home'); // Ganti ke /profile kalau halaman profile
    } else {
      const toast = await this.toastController.create({
        message: 'Email / No HP atau Password salah!',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
