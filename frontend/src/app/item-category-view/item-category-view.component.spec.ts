import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategoryViewComponent } from './item-category-view.component';

describe('ItemCategoryViewComponent', () => {
  let component: ItemCategoryViewComponent;
  let fixture: ComponentFixture<ItemCategoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCategoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
