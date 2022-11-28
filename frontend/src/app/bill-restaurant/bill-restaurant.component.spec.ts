import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRestaurantComponent } from './bill-restaurant.component';

describe('BillRestaurantComponent', () => {
  let component: BillRestaurantComponent;
  let fixture: ComponentFixture<BillRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
