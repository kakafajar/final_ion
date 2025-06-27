import { Component, NgZone, OnInit } from '@angular/core';
import { TransaksiService } from '../service/transaksi.service';

declare var QRCode: any;

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
      });
      
      this.transaksis.forEach((transaksi, index)=>{
        if (transaksi.order.jenis_order === 'reservasi') {
          const targetDivId = 'qrcode-' + index;
          const el = document.getElementById(targetDivId);
          if (el) {
            el.innerHTML = ''; // Bersihkan QR sebelumnya jika ada
            new QRCode(el, {
              text: transaksi.kode_transaksi,
              width: 200,
              height: 200
            });
          }
        }
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
