// src/app/profil/profil.page.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Import RouterLink
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Atau impor komponen Ionic individual

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true, // <-- INI KUNCINYA SEHINGGA NG6008 MUNCUL
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // <-- Pastikan ini (atau komponen Ionic individual) ada di sini
    RouterLink  // <-- Tambahkan jika Anda menggunakan [routerLink] di template ProfilPage
  ]
})
export class ProfilPage implements OnInit {
  username: string = 'Guest';
  email: string = '';

  constructor(private router: Router) {}

ngOnInit() {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.username = user.username;
      this.email = user.email;
    }
  }

  goToEditProfile() {
    this.router.navigate(['/edit-profil']);
  }

  goToOrderHistory() {
    this.router.navigate(['/riwayat-pesanan']);
  }

  goToPaymentMethods() {
    this.router.navigate(['/metode-pembayaran']);
  }

  goToHelp() {
    this.router.navigate(['/bantuan']);
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
