import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBankAccountsComponent } from './register-bank-accounts.component';

describe('RegisterBankAccountsComponent', () => {
  let component: RegisterBankAccountsComponent;
  let fixture: ComponentFixture<RegisterBankAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBankAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBankAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
