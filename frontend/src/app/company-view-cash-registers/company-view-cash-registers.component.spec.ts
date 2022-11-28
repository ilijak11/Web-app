import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyViewCashRegistersComponent } from './company-view-cash-registers.component';

describe('CompanyViewCashRegistersComponent', () => {
  let component: CompanyViewCashRegistersComponent;
  let fixture: ComponentFixture<CompanyViewCashRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyViewCashRegistersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyViewCashRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
