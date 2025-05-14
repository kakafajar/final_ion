import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TakeAwayPage } from './take-away.page';

describe('TakeAwayPage', () => {
  let component: TakeAwayPage;
  let fixture: ComponentFixture<TakeAwayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeAwayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
