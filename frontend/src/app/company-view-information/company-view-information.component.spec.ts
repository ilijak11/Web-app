import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyViewInformationComponent } from './company-view-information.component';

describe('CompanyViewInformationComponent', () => {
  let component: CompanyViewInformationComponent;
  let fixture: ComponentFixture<CompanyViewInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyViewInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyViewInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
