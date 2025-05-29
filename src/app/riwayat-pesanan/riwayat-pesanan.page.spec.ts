import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiwayatPesananPage } from './riwayat-pesanan.page';

describe('RiwayatPesananPage', () => {
  let component: RiwayatPesananPage;
  let fixture: ComponentFixture<RiwayatPesananPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RiwayatPesananPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
