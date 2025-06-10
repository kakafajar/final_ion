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
  showPassword = false;

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async login() {
  // Validasi field kosong
  if (!this.identifier || !this.password) {
    const toast = await this.toastController.create({
      message: 'Email/No HP dan password harus diisi.',
      duration: 2000,
      color: 'warning',
    });
    await toast.present();
    return;
  }

  // Cek apakah identifier terlihat seperti email, dan validasi format email jika iya
  const isEmail = this.identifier.includes('@');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (isEmail && !emailRegex.test(this.identifier)) {
    const toast = await this.toastController.create({
      message: 'Format email tidak valid.',
      duration: 2000,
      color: 'danger',
    });
    await toast.present();
    return;
  }

  // Ambil data user dari localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const foundUser = users.find((user: any) =>
    (user.email === this.identifier || user.phone === this.identifier) &&
    user.password === this.password
  );

  if (foundUser) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
    localStorage.setItem('username', foundUser.username);

    const toast = await this.toastController.create({
      message: 'Login berhasil!',
      duration: 2000,
      color: 'success',
    });
    await toast.present();

    this.navCtrl.navigateForward('/home');
  } else {
    const toast = await this.toastController.create({
      message: 'Email / No HP atau Password salah!',
      duration: 2000,
      color: 'danger',
    });
    await toast.present();
  }
}


togglePassword() {
  this.showPassword = !this.showPassword;
}


  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
