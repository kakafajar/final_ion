import { Component, OnInit } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  username: string = 'Guest';  // default kalau belum ada data
  email: string = '';

  constructor() {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username || 'Guest';
      this.email = user.email || '';
    }
  }

}
