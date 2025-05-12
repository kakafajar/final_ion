import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: any[] = []; // ✅ Bisa dipakai jika belum pakai model
;
  private orderType = '';

  addItemToCart(item: any) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.qty++;
    } else {
      this.items.push({ ...item, qty: 1 });
    }
  }

  getCartItems() {
    return this.items;
  }

  setOrderType(type: string) {
    this.orderType = type;
  }

  getOrderType() {
    return this.orderType;
  }
}

