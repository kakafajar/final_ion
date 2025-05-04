import { Component } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';

  items = [
    { id: 'burger', name: 'BURGER', img: 'assets/makanan/burger.jpg', time: '30 min', sold: '200', count: 0 },
    { id: 'pizza', name: 'PIZZA', img: 'assets/makanan/pizza.jpg', time: '30 min', sold: '200', count: 0 },
    { id: 'chicken', name: 'AYAM KRIUK', img: 'assets/makanan/chiken.jpg', time: '30 min', sold: '200', count: 0 },
    { id: 'spageti', name: 'SPAGETI', img: 'assets/makanan/spageti.jpg', time: '30 min', sold: '200', count: 0 }
  ];

  ngOnInit() {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.username = user.username;
    }
  }

  increment(id: string) {
    const item = this.items.find(i => i.id === id);
    if (item) item.count++;
  }

  decrement(id: string) {
    const item = this.items.find(i => i.id === id);
    if (item && item.count > 0) item.count--;
  }
}
