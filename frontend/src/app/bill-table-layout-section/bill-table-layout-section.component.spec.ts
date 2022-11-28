import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTableLayoutSectionComponent } from './bill-table-layout-section.component';

describe('BillTableLayoutSectionComponent', () => {
  let component: BillTableLayoutSectionComponent;
  let fixture: ComponentFixture<BillTableLayoutSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillTableLayoutSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillTableLayoutSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
