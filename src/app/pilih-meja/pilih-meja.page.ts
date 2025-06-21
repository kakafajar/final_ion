import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-pilih-meja',
  templateUrl: './pilih-meja.page.html',
  styleUrls: ['./pilih-meja.page.scss'],
})
export class PilihMejaPage {
mejaList = [
    { id: 1, nama: 'Meja 1' },
    { id: 2, nama: 'Meja 2' },
    { id: 3, nama: 'Meja 3' },
  ];

  constructor(private router: Router) {}

  pilihMeja(meja: any) {
    localStorage.setItem('selectedTable', JSON.stringify(meja));
    this.router.navigate(['/dine-in', 'reservasi']); // 👉 navigasi ke halaman menu dengan tipe reservasi
  }

}
