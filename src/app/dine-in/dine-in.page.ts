import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodDetailComponent } from '../food-detail/food-detail.component';




@Component({
  standalone: false,
  selector: 'app-dine-in',
  templateUrl: './dine-in.page.html',
  styleUrls: ['./dine-in.page.scss']
})
export class DineInPage implements OnInit {
  constructor(private modalController: ModalController) {}

  selectedCategory: string = 'special'; // default selected
  totalCount = 0;

 items = [
  {
    id: 1,
    name: 'burger',
    category: 'special',
    price: 25000,
    image: 'assets/makanan/burger.jpg',
    description: 'chees burger.',
    count: 0
  },
  {
    id: 2,
    name: 'Mie Ayam',
    category: 'special',
    price: 20000,
    image: 'assets/img/mieayam.jpg',
    description: 'Mie ayam dengan kuah kaldu gurih dan topping ayam manis.',
    count: 0
  },
  {
    id: 3,
    name: 'burger',
    category: 'special',
    price: 25000,
    image: 'assets/makanan/burger.jpg',
    description: 'chees burger.',
    count: 0
  },
  {
    id: 4,
    name: 'Mie Ayam',
    category: 'special',
    price: 20000,
    image: 'assets/img/mieayam.jpg',
    description: 'Mie ayam dengan kuah kaldu gurih dan topping ayam manis.',
    count: 0
  },
  {
    id: 5,
    name: 'burger',
    category: 'special',
    price: 25000,
    image: 'assets/makanan/burger.jpg',
    description: 'chees burger.',
    count: 0
  },
  {
    id: 6,
    name: 'Mie Ayam',
    category: 'special',
    price: 20000,
    image: 'assets/img/mieayam.jpg',
    description: 'Mie ayam dengan kuah kaldu gurih dan topping ayam manis.',
    count: 0
  },
  // Tambah item lainnya dengan id unik dan count: 0
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

async openFoodDetail(item: any) {
  const modal = await this.modalController.create({
    component: FoodDetailComponent,
    componentProps: { food: item },
    breakpoints: [0, 0.5, 0.9],
    initialBreakpoint: 0.9,
    showBackdrop: true,
  });
  return await modal.present();
}



}
