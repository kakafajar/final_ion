import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [IonicModule], // ✅ Tambahkan ini
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent {
  @Input() food: any;

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  increment() {
    this.food.count++;
  }

  decrement() {
    if (this.food.count > 0) {
      this.food.count--;
    }
  }
  checkout() {
  console.log('Checkout with', this.food.count, 'x', this.food.name);
  this.modalController.dismiss({ checkout: true, item: this.food });
}

}
