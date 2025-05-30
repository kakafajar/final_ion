import { Component } from '@angular/core';

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
  }

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
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
