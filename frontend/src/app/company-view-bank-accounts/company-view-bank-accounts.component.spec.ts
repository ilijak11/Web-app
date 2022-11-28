import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyViewBankAccountsComponent } from './company-view-bank-accounts.component';

describe('CompanyViewBankAccountsComponent', () => {
  let component: CompanyViewBankAccountsComponent;
  let fixture: ComponentFixture<CompanyViewBankAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyViewBankAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyViewBankAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
