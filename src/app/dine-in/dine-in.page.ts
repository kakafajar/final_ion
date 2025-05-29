import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodDetailComponent } from '../food-detail/food-detail.component';
import { CartService } from '../service/cart.service';
import { MENU_ITEMS } from 'src/app/data/menu';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-dine-in',
  templateUrl: './dine-in.page.html',
  styleUrls: ['./dine-in.page.scss']
})
export class DineInPage implements OnInit {
  selectedCategory: string = '';
  totalCount = 0;
  cartItems: any[] = [];
  orderType: string = '';

  items = MENU_ITEMS;
  filteredItems: any[] = [];

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let tipe : any = route.snapshot.paramMap.get('tipe');
    if (tipe != null){
      this.orderType = tipe;
      console.log(this.orderType);
      
    } else{
      this.orderType = "dinein"
    }
  }

  resetItemCounts() {
  this.items.forEach(item => {
    item.count = 0;
  });
  this.updateTotalCount();
}


  ngOnInit() {
    this.cartService.clearCart();
    this.cartService.setOrderType(this.orderType);
    this.filterItemsByCategory();
    this.resetItemCounts();
    this.cartItems = this.cartService.getCartItems();
    this.filteredItems = this.items;
    this.items.forEach(item => {
      const cartItem = this.cartService.getCartItems().find(ci => ci.id === item.id);
      item.count = cartItem?.qty ?? 0;
    });

    
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

  //kode baru
  increment(id: number) {
  const item = this.items.find(i => i.id === id);
  if (!item) return;

  const existing = this.cartService.getCartItems().find(i => i.id === id);

  if (!existing) {
    item.count = 1;
    this.cartService.addItemToCart({ ...item });
  } else {
    item.count = existing.qty + 1;
    this.cartService.addItemToCart({ ...item });
  }

  this.updateTotalCount();
  }


  //kode baru
  decrement(id: number) {
  const item = this.items.find(i => i.id === id);
  if (!item || item.count <= 0) return;

  this.cartService.decreaseItemQty(item);

  const updatedItem = this.cartService.getCartItems().find(i => i.id === id);
  item.count = updatedItem?.qty ?? 0;

  this.updateTotalCount();
}


  presentOrderType(item: any) {
    item.count = 1;
    this.updateTotalCount();
  }

  updateTotalCount() {
    this.totalCount = this.items.reduce((sum, i) => sum + i.count, 0);
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

  goToOrderDetail() {
    this.router.navigate(['/order-detail']);
  }

  
}
