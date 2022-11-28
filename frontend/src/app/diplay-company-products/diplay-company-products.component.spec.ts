import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplayCompanyProductsComponent } from './diplay-company-products.component';

describe('DiplayCompanyProductsComponent', () => {
  let component: DiplayCompanyProductsComponent;
  let fixture: ComponentFixture<DiplayCompanyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplayCompanyProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplayCompanyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
