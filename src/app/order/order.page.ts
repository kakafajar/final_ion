import { Component } from '@angular/core';

declare var QRCode: any;

@Component({
  standalone: false,
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage {
  orders: any[] = [];
  expandedIndex: number | null = null;

  ionViewWillEnter() {
    const storedOrders = localStorage.getItem('allOrders');
    this.orders = storedOrders ? JSON.parse(storedOrders) : [];

    setTimeout(() => {
      this.orders.forEach((order, index) => {
        if (order.orderType === 'reservasi') {
          const targetDivId = 'qrcode-' + index;
          const el = document.getElementById(targetDivId);
          if (el) {
            el.innerHTML = ''; // Bersihkan QR sebelumnya jika ada
            new QRCode(el, {
              text: JSON.stringify({
                name: order.reservationData.name,
                phone: order.reservationData.phone,
                meja: order.table?.nama || '-',
                jumlahOrang: order.reservationData.peopleCount,
                tanggal: order.reservationData.tanggalDanJam,
                total: order.total
              }),
              width: 200,
              height: 200
            });
          }
        }
      });
    }, 300); // waktu render konten
  }

  toggleDetails(index: number) {
  this.expandedIndex = this.expandedIndex === index ? null : index;

  // Generate QR hanya jika tipe reservasi
  if (this.expandedIndex !== null) {
    const order = this.orders[this.expandedIndex];
    if (order.orderType === 'reservasi') {
      setTimeout(() => {
        const el = document.getElementById('qrcode-' + this.expandedIndex);
        if (el) {
          el.innerHTML = '';
          new QRCode(el, {
            text: JSON.stringify({
              name: order.reservationData.name,
              phone: order.reservationData.phone,
              meja: order.table?.nama || '-',
              jumlahOrang: order.reservationData.peopleCount,
              tanggal: order.reservationData.tanggalDanJam,
              total: order.total
            }),
            width: 200,
            height: 200
          });
        }
      }, 100); // delay agar div qrcode sudah render
    }
  }
}


  getIcon(type: string): string {
    switch (type) {
      case 'takeaway': return 'bag-outline';
      case 'dinein': return 'restaurant-outline';
      case 'reservasi': return 'calendar-outline';
      default: return 'help-circle-outline';
    }
  }

  clearOrders() {
    localStorage.removeItem('allOrders');
    this.orders = [];
  }
}
