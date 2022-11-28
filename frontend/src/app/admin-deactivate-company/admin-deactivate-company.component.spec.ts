import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeactivateCompanyComponent } from './admin-deactivate-company.component';

describe('AdminDeactivateCompanyComponent', () => {
  let component: AdminDeactivateCompanyComponent;
  let fixture: ComponentFixture<AdminDeactivateCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeactivateCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeactivateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
