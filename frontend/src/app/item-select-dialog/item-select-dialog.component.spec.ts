import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSelectDialogComponent } from './item-select-dialog.component';

describe('ItemSelectDialogComponent', () => {
  let component: ItemSelectDialogComponent;
  let fixture: ComponentFixture<ItemSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSelectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
