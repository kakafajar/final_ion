import { Component, OnInit } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-dine-in',
  templateUrl: './dine-in.page.html',
  styleUrls: ['./dine-in.page.scss'],
})
export class DineInPage implements OnInit {

  constructor() { }

  specialItems = [
    {
      img: 'assets/gambar/item1.jpg',
      name: 'Spaghetti',
      description: 'Delicious pasta with tomato sauce'
    },
    {
      img: 'assets/gambar/item2.jpg',
      name: 'Burger',
      description: 'Beef burger with fries'
    }
    // Tambah data sesuai kebutuhan
  ];

  ngOnInit() {  
  }

}
