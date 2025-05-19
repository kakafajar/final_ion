import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: any[] = [];
  private orderType = '';

  constructor() {
    this.loadCartFromStorage(); // ⬅️ Muat data dari localStorage saat service dipanggil
    this.loadOrderTypeFromStorage();
  }

  addItemToCart(item: any) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.qty++;
    } else {
      this.items.push({ ...item, qty: 1 });
    }
    this.saveCartToStorage(); // ⬅️ Simpan ke localStorage
  }

  decreaseItemQty(item: any) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.qty--;
      if (existing.qty <= 0) {
        this.items = this.items.filter(i => i.id !== item.id);
      }
      this.saveCartToStorage();
    }
  }

  removeItemById(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.saveCartToStorage();
  }

  getCartItems() {
    return this.items;
  }

  setOrderType(type: string) {
    this.orderType = type;
    localStorage.setItem('orderType', type);
  }

  getOrderType() {
    return this.orderType;
  }

  // 🧠 Simpan isi keranjang ke localStorage
  private saveCartToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  // 📦 Ambil isi keranjang dari localStorage
  private loadCartFromStorage() {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }

  private loadOrderTypeFromStorage() {
    const savedType = localStorage.getItem('orderType');
    if (savedType) {
      this.orderType = savedType;
    }
  }

  // 🧹 Tambahan opsional: untuk clear keranjang
  clearCart() {
    this.items = [];
    localStorage.removeItem('cartItems');
  }
}
