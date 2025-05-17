import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-reservasi',
  templateUrl: './reservasi.page.html',
  styleUrls: ['./reservasi.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservasiPage implements OnInit {
  // Data untuk pesanan
  pesanan = [
    {
      nama: 'Salad Sayuran',
      jumlah: 1,
      gambar: 'assets/images/salad.jpg'
    },
    {
      nama: 'Salad Buah',
      jumlah: 1,
      gambar: 'assets/images/salad.jpg'
    },
    {
      nama: 'Salad Kentang',
      jumlah: 1,
      gambar: 'assets/images/salad.jpg'
    }
  ];

  // Form data
  formData = {
    namaLengkap: '',
    noHP: '',
    jumlahOrang: '',
    lokasiMeja: '', // 'Di Luar' atau 'Di Dalam'
  };

  // Opsi untuk dropdown jumlah orang
  jumlahOrangOptions = ['1', '2', '3', '4', '5', '6', '7', '8'];

  // Status meja
  statusMeja = 'Tersedia'; // Atau 'Tidak Tersedia'

  // Total harga
  totalHarga = 'Rp.9999';

  // Method pembayaran
  metodePembayaran = '';
  metodePembayaranOptions = ['Tunai', 'Kartu Kredit', 'QRIS', 'Transfer Bank'];

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    // Inisialisasi data jika diperlukan
  }

  // Method untuk memilih lokasi meja
  pilihLokasiMeja(lokasi: string) {
    this.formData.lokasiMeja = lokasi;
  }

  // Method untuk memilih metode pembayaran
  async pilihMetodePembayaran() {
    // Implementasi pilihan metode pembayaran menggunakan AlertController
    const alert = await this.alertController.create({
      header: 'Pilih Metode Pembayaran',
      inputs: this.metodePembayaranOptions.map(metode => ({
        name: metode,
        type: 'radio',
        label: metode,
        value: metode,
        checked: this.metodePembayaran === metode
      })),
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (data) => {
            this.metodePembayaran = data;
          }
        }
      ]
    });

    await alert.present();
  }

  // Method untuk mengirim reservasi
  async kirimReservasi() {
    // Validasi form
    if (!this.formData.namaLengkap || !this.formData.noHP || !this.formData.jumlahOrang || !this.formData.lokasiMeja) {
      this.tampilkanAlert('Error', 'Mohon lengkapi semua data reservasi');
      return;
    }

    // Proses reservasi
    this.tampilkanAlert('Sukses', 'Reservasi berhasil dibuat!');
  }

  // Method untuk menampilkan alert
  async tampilkanAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Kembali ke halaman sebelumnya
  kembali() {
    // Navigasi kembali
  }
}
