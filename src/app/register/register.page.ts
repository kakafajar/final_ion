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

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async register() {
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
    toast.present();

  if (success) {
      // Simpan data username dan email ke localStorage
      localStorage.setItem('userData', JSON.stringify({
        username: this.username,
        email: this.email
      }));

      // Navigasi ke login atau langsung ke profil sesuai kebutuhan
      this.navCtrl.navigateForward('/login');
    }
  }
}
