import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewRevenueComponent } from './admin-view-revenue.component';

describe('AdminViewRevenueComponent', () => {
  let component: AdminViewRevenueComponent;
  let fixture: ComponentFixture<AdminViewRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
