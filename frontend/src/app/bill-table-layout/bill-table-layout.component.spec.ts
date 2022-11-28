import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTableLayoutComponent } from './bill-table-layout.component';

describe('BillTableLayoutComponent', () => {
  let component: BillTableLayoutComponent;
  let fixture: ComponentFixture<BillTableLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillTableLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillTableLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
