import { Component, NgZone, OnInit } from '@angular/core';
import { TransaksiService } from '../service/transaksi.service';

@Component({
  standalone: false,
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  transaksis: any[] = [];
  expandedIndex: number | null = null;

  constructor(
    private ngZone:NgZone,

    private transaksiService:TransaksiService
  ){}

  ngOnInit(): void {
    this.ngZone.run(()=>{
      this.transaksiService.whereUserId(localStorage.getItem('user_id'))
      .subscribe(response=>{

        this.transaksis.push(...response.data);
        console.log(response);
        
      });
    });
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

}
