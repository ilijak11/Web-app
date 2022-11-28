import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCashRegistersComponent } from './register-cash-registers.component';

describe('RegisterCashRegistersComponent', () => {
  let component: RegisterCashRegistersComponent;
  let fixture: ComponentFixture<RegisterCashRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCashRegistersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCashRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
