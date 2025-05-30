// src/app/edit-profil/edit-profil.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.page.html', // Diperbaiki: sesuaikan dengan nama file yang benar
  styleUrls: ['./edit-profil.page.scss'], // Diperbaiki: sesuaikan dengan nama file yang benar
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class EditProfilPage implements OnInit { // Ubah nama class menjadi EditProfilPage
  user = {
    avatar: 'assets/icon/profil.jpg',
    username: '',
    email: '',
    phone: '',
  };

  password = {
    current: '',
    new: '',
    confirm: '',
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  ionViewWillEnter() {
    // Anda bisa memanggil loadUserData() di sini jika ingin data
    // selalu diperbarui setiap kali halaman ini dibuka
  }

  loadUserData() {
    // Ambil data dari localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      this.user.username = parsedData.username || '';
      this.user.email = parsedData.email || '';
      this.user.phone = parsedData.phone || '';
      this.user.avatar = parsedData.avatar || 'assets/icon/profil.jpg';
    } else {
      console.warn('Tidak ada data pengguna di localStorage untuk dimuat.');
    }
  }

  async changeAvatar() {
    console.log('Tombol Ubah Foto diklik.');
    this.presentToast('Fungsi ubah avatar belum diimplementasikan sepenuhnya.');
  }

  async saveProfile() {
    // Validasi input sederhana
    if (!this.user.username.trim() || !this.user.email.trim()) {
      this.presentAlert('Validasi Gagal', 'Nama pengguna dan email tidak boleh kosong.');
      return;
    }

    // Validasi format email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.user.email)) {
      this.presentAlert('Validasi Gagal', 'Format email tidak valid.');
      return;
    }

    console.log('Menyimpan profil pengguna:', this.user);

    // Simpan ke localStorage
    const existingDataString = localStorage.getItem('userData');
    let dataToSave = {};
    if (existingDataString) {
      try {
        dataToSave = JSON.parse(existingDataString) || {};
      } catch (e) {
        console.error('Error parsing userData dari localStorage:', e);
      }
    }

    const updatedUserData = {
      ...dataToSave,
      username: this.user.username,
      email: this.user.email,
      phone: this.user.phone,
      avatar: this.user.avatar,
    };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));

    this.presentToast('Profil berhasil diperbarui!');
    this.navController.navigateBack('/profil');
  }

  async savePassword() {
    // Validasi input
    if (!this.password.current || !this.password.new || !this.password.confirm) {
      this.presentAlert('Validasi Gagal', 'Semua field untuk ubah kata sandi harus diisi.');
      return;
    }
    if (this.password.new !== this.password.confirm) {
      this.presentAlert('Validasi Gagal', 'Kata sandi baru dan konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (this.password.new.length < 6) {
      this.presentAlert('Validasi Gagal', 'Kata sandi baru minimal harus 6 karakter.');
      return;
    }

    console.log('Proses perubahan kata sandi...');
    this.presentToast('Fungsi ubah kata sandi memerlukan integrasi backend (belum diimplementasikan di contoh ini).');
    this.password = { current: '', new: '', confirm: '' };
  }

  async presentToast(message: string, duration: number = 2500, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'bottom',
      color: color,
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
