// src/app/riwayat-pesanan/riwayat-pesanan.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Untuk *ngIf, *ngFor, dll.
import { FormsModule } from '@angular/forms';   // Jika Anda menggunakan [(ngModel)]
import { IonicModule } from '@ionic/angular';   // Untuk semua komponen Ionic
// Atau impor komponen Ionic spesifik jika Anda mau:
// import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem /* ...komponen lain */ } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router'; // Jika Anda menggunakan [routerLink] di template

@Component({
  selector: 'app-riwayat-pesanan',
  templateUrl: './riwayat-pesanan.page.html',
  styleUrls: ['./riwayat-pesanan.page.scss'],
  standalone: true, // <-- 1. Tambahkan ini
  imports: [        // <-- 2. Tambahkan array imports
    CommonModule,
    FormsModule,
    IonicModule,    // Impor IonicModule di sini agar template mengenali ion-header, dll.
    // Jika menggunakan RouterLink di template ini, tambahkan juga:
    // RouterLink
  ]
})
export class RiwayatPesananPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Logika halaman Anda di sini...
}
