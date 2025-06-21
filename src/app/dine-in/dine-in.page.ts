import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { FoodDetailComponent } from '../food-detail/food-detail.component';
import { CartService } from '../service/cart.service';
import { MENU_ITEMS } from 'src/app/data/menu';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-dine-in',
  templateUrl: './dine-in.page.html',
  styleUrls: ['./dine-in.page.scss']
})
export class DineInPage implements OnInit, OnDestroy {
  selectedCategory: string = '';
  totalCount = 0;
  cartItems: any[] = [];
  orderType: string = '';
  isActive = true;


  items = MENU_ITEMS;
  filteredItems: any[] = [];
  selectedTable: any = null;
  mejaDipilih: any = null;

  mejaList = [
    { id: 1, nama: 'Meja 1' },
    { id: 2, nama: 'Meja 2' },
    { id: 3, nama: 'Meja 3' }
  ];

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private platform: Platform,
    private ngZone: NgZone,
    private location: Location
  ) {
    let tipe: any = route.snapshot.paramMap.get('tipe');
    this.orderType = tipe ? tipe : 'dinein';
  }

  ngOnDestroy() {
  this.isActive = false;
}


  ngOnInit() {
    const table = localStorage.getItem('selectedTable');
    if (table) {
      this.selectedTable = JSON.parse(table);
    }

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

    // Tombol back Android
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackNavigation();
    });

    // Tombol back browser
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.restoredState) {
        this.handleBackNavigation();
      }
    });
  }

  handleBackNavigation() {
    if (!this.isActive) return;

    if (this.orderType === 'reservasi' && this.selectedTable) {
      this.alertController.create({
        header: 'Kembali ke Pilih Meja?',
        message: 'Apakah Anda ingin memilih meja lain?',
        buttons: [
          {
            text: 'Ya',
            handler: () => {
              this.ngZone.run(() => {
                this.selectedTable = null;
                localStorage.removeItem('selectedTable');
              });
            }
          },
          {
            text: 'Tidak',
            role: 'cancel',
            handler: () => {
              this.location.back();
            }
          }
        ]
      }).then(alert => alert.present());
    } else {
      this.location.back();
    }
  }

  konfirmasiPilihMeja() {
    this.selectedTable = this.mejaDipilih;
    localStorage.setItem('selectedTable', JSON.stringify(this.selectedTable));
  }

  resetItemCounts() {
    this.items.forEach(item => {
      item.count = 0;
    });
    this.updateTotalCount();
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

  decrement(id: number) {
    const item = this.items.find(i => i.id === id);
    if (!item || item.count <= 0) return;

    this.cartService.decreaseItemQty(item);

    const updatedItem = this.cartService.getCartItems().find(i => i.id === id);
    item.count = updatedItem?.qty ?? 0;

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

  async goToOrderDetail() {
    const user = localStorage.getItem('loggedInUser');

    if (!user) {
      const alert = await this.alertController.create({
        header: 'Login Diperlukan',
        message: 'Silakan login atau daftar terlebih dahulu untuk melanjutkan checkout.',
        buttons: [
          {
            text: 'Login',
            role: 'login',
            handler: () => {
              this.router.navigate(['/login']);
            },
            cssClass: 'custom-orange'
          },
          {
            text: 'Daftar',
            role: 'register',
            handler: () => {
              this.router.navigate(['/register']);
            },
            cssClass: 'custom-orange'
          },
          {
            text: 'Batal',
            role: 'cancel',
            cssClass: 'custom-cancel'
          }
        ],
        cssClass: 'custom-alert'
      });

      await alert.present();
      return;
    }

    // Kirim data selectedTable ke order-detail
  this.router.navigate(['/order-detail'], {
    state: {
      selectedTable: this.selectedTable
    }
  });
  }
}
