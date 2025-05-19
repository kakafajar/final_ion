import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ActionSheetButton, NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
})
export class OrderDetailPage {
  items: any[] = [];
  orderType: string = '';
  selectedPaymentMethod: string = '';
  showPaymentOptions: boolean = false;

  reservationData = {
    name: '',
    phone: '',
    peopleCount: 2,
    tanggal: '',
    jam: '',
    tableLocation: '',
    tableStatus: ''
  };

  constructor(
    private cartService: CartService,
    private navCtrl: NavController
  ) {}

  ionViewWillEnter() {
    this.items = this.cartService.getCartItems();
    this.orderType = this.cartService.getOrderType();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  paymentOptions: ActionSheetButton[] = [
    {
      text: 'Cash',
      handler: () => {
        this.selectedPaymentMethod = 'Cash';
      }
    },
    {
      text: 'Debit Card',
      handler: () => {
        this.selectedPaymentMethod = 'Debit Card';
      }
    },
    {
      text: 'QRIS',
      handler: () => {
        this.selectedPaymentMethod = 'QRIS';
      }
    },
    {
      text: 'Cancel',
      role: 'cancel'
    }
  ];

  openPaymentOptions() {
    this.showPaymentOptions = true;
  }

  getIcon(type: string): string {
    switch (type) {
      case 'Take Away': return 'bag-outline';
      case 'Dine In': return 'restaurant-outline';
      case 'Reservation': return 'calendar-outline';
      default: return 'help-circle-outline';
    }
  }

  // ✅ Simpan Order ke localStorage (untuk riwayat + untuk tampil di Home)
  saveOrder() {
  const newOrder = {
    items: this.items,
    orderType: this.orderType,
    paymentMethod: this.selectedPaymentMethod || '',
    reservationData: this.orderType === 'Reservation' ? this.reservationData : null,
    total: this.getTotal(),
    timestamp: new Date().toISOString()
  };

  // Ambil semua pesanan yang sudah ada
  const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');

  // Tambahkan pesanan baru
  allOrders.push(newOrder);

  // Simpan kembali ke localStorage
  localStorage.setItem('allOrders', JSON.stringify(allOrders));

  console.log('✅ Order saved to allOrders[]', newOrder);
}

  // ✅ Submit Order
  submitOrder() {
    if (!this.selectedPaymentMethod) {
      alert('Silakan pilih metode pembayaran terlebih dahulu!');
      return;
    }

    if (this.orderType === 'Reservation') {
      const { name, phone, tanggal, jam } = this.reservationData;
      if (!name || !phone || !tanggal || !jam) {
        alert('Harap lengkapi data reservasi!');
        return;
      }
    }

    this.saveOrder();
    this.cartService.clearCart(); // Kosongkan keranjang setelah simpan
    this.navCtrl.navigateForward('/home'); // Arahkan ke halaman utama
  }
}
