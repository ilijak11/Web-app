import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompanyAdminComponent } from './register-company-admin.component';

describe('RegisterCompanyAdminComponent', () => {
  let component: RegisterCompanyAdminComponent;
  let fixture: ComponentFixture<RegisterCompanyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCompanyAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCompanyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
