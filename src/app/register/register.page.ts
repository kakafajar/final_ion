import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  standalone:false,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'] 
})
export class RegisterPage {
  username = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async register() {
  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    const toast = await this.toastController.create({
      message: 'Format email tidak valid.',
      duration: 2000,
      color: 'danger',
    });
    await toast.present();
    return;
  }

  // Validasi nomor HP hanya angka
const phoneRegex = /^[0-9]+$/;
if (!phoneRegex.test(this.phone)) {
  const toast = await this.toastController.create({
    message: 'Nomor HP hanya boleh berisi angka.',
    duration: 2000,
    color: 'danger',
  });
  await toast.present();
  return;
}


  const success = this.authService.register({
    username: this.username,
    email: this.email,
    phone: this.phone,
    password: this.password,
  });

  const toast = await this.toastController.create({
    message: success ? 'Registrasi berhasil!' : 'Email atau No HP sudah digunakan.',
    duration: 2000,
    color: success ? 'success' : 'danger',
  });
  await toast.present();

  if (success) {
    localStorage.setItem('userData', JSON.stringify({
      username: this.username,
      email: this.email
    }));

    this.navCtrl.navigateForward('/login');
  }
}

togglePassword() {
  this.showPassword = !this.showPassword;
}

goToLogin() {
  this.navCtrl.navigateBack('/login');
}

toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}

}
