import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderersComponent } from './orderers.component';

describe('OrderersComponent', () => {
  let component: OrderersComponent;
  let fixture: ComponentFixture<OrderersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
