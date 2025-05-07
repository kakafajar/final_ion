import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-dine-in',
  templateUrl: './dine-in.page.html',
  styleUrls: ['./dine-in.page.scss']
})
export class DineInPage implements OnInit {
  constructor() {}

  selectedCategory: string = 'special'; // default selected
  totalCount = 0;

  items = [
    { id: 1, name: 'Special Beef', img: 'assets/makanan/burger.jpg', count: 0, time: '10 min', sold: 15, category: 'special' },
    { id: 2, name: 'Combo Spesial', img: 'assets/makanan/pizza.jpg', count: 0, time: '15 min', sold: 30, category: 'combo' },
    { id: 3, name: 'Nasi Goreng', img: 'assets/makanan/nasigoreng.jpg', count: 0, time: '12 min', sold: 20, category: 'nasi' },
    { id: 4, name: 'Mie Ayam', img: 'assets/makanan/mieayam.jpg', count: 0, time: '8 min', sold: 25, category: 'mie' },
    { id: 5, name: 'Mie Goreng', img: 'assets/makanan/miegoreng.jpg', count: 0, time: '9 min', sold: 10, category: 'mie' }
    // Tambahkan lebih banyak item sesuai kebutuhan
  ];

  filteredItems: any[] = [];

  ngOnInit() {
    this.filterItemsByCategory();
  }

  onCategoryChange(event: any) {
    const categoryId = event.detail.value;
    const el = document.getElementById(categoryId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  
  filterItemsByCategory() {
    this.filteredItems = this.items.filter(item => item.category === this.selectedCategory);
  }

  increment(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.count++;
      this.updateTotalCount();
    }
  }

  decrement(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item && item.count > 0) {
      item.count--;
      this.updateTotalCount();
    }
  }

  presentOrderType(item: any) {
    item.count = 1;
    this.updateTotalCount();
  }

  updateTotalCount() {
    this.totalCount = this.items.reduce((sum, i) => sum + i.count, 0);
  }

  goToCheckout() {
    console.log("Go to checkout with", this.totalCount, "items");
  }
}
