import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyViewStorageUnistComponent } from './company-view-storage-unist.component';

describe('CompanyViewStorageUnistComponent', () => {
  let component: CompanyViewStorageUnistComponent;
  let fixture: ComponentFixture<CompanyViewStorageUnistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyViewStorageUnistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyViewStorageUnistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
