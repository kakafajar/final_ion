import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodDetailComponent } from '../food-detail/food-detail.component';
import { CartService } from '../cart.service';
import { MENU_ITEMS } from  'src/app/data/menu';

@Component({
  standalone: false,
  selector: 'app-take-away',
  templateUrl: './take-away.page.html',
  styleUrls: ['./take-away.page.scss'],
})
export class TakeAwayPage implements OnInit {
 selectedCategory: string = '';
  totalCount = 0;

  cartItems: any[] = [];        // ✅ Diperbaiki
  orderType: string = '';       // ✅ Diperbaiki

  items = MENU_ITEMS;  //ini bisa
    // items = [...MENU_ITEMS];   //ini juga bisa

  filteredItems: any[] = [];

  constructor(
    private modalController: ModalController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.filterItemsByCategory();
    this.cartItems = this.cartService.getCartItems(); // ✅ Ambil item dari cart
    this.orderType = this.cartService.getOrderType(); // ✅ Tampilkan jenis pesanan (DINE IN, dsb)
    // this.items = MENU_ITEMS;
    this.filteredItems = this.items; //ada ini buat manggil itemsnya
  }

  filterItems(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
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
    // tambahkan navigasi ke halaman checkout jika sudah tersedia
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
