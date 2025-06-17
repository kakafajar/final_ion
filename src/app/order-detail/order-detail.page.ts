import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ActionSheetButton, NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage {
  items: any[] = [];
  orderType: string = '';
  selectedPaymentMethod: string = '';
  showPaymentOptions: boolean = false;
  paymentProof: string | ArrayBuffer | null = null;
  


  reservationData = {
    name: '',
    phone: '',
    peopleCount: 2,
    tanggalDanJam:new Date().toISOString(),
    tableLocation: '',
    tableStatus: ''
  };

  datetime : string = new Date().toISOString();

  constructor(
    private cartService: CartService,
    private navCtrl: NavController
  ) {
    console.log(cartService.getCartItems());
  }

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
    paymentMethod: this.selectedPaymentMethod,
    paymentProof: this.paymentProof,
    reservationData: this.orderType === 'reservasi' ? this.reservationData : null,
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
    // console.log(this.reservationData.tanggalDanJam);
    
  if (this.selectedPaymentMethod === 'QRIS' && !this.paymentProof) {
    alert('Silakan upload bukti pembayaran QRIS terlebih dahulu.');
    return;
  }

    if (this.orderType === 'reservasi') {
      const { name, phone, tanggalDanJam } = this.reservationData;
      if (!name || !phone || !tanggalDanJam) {
        alert('Harap lengkapi data reservasi!');
        return;
      }
    }

    this.saveOrder();
    this.cartService.clearCart(); // Kosongkan keranjang setelah simpan
    this.navCtrl.navigateForward('/home'); // Arahkan ke halaman utama
  }

  onImageSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.paymentProof = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

}
