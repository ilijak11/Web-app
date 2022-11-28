import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFirstLoginComponent } from './company-first-login.component';

describe('CompanyFirstLoginComponent', () => {
  let component: CompanyFirstLoginComponent;
  let fixture: ComponentFixture<CompanyFirstLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFirstLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFirstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
