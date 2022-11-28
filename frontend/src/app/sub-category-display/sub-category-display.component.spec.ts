import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryDisplayComponent } from './sub-category-display.component';

describe('SubCategoryDisplayComponent', () => {
  let component: SubCategoryDisplayComponent;
  let fixture: ComponentFixture<SubCategoryDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
