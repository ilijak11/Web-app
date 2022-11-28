import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLayoutObjectSectionComponent } from './table-layout-object-section.component';

describe('TableLayoutObjectSectionComponent', () => {
  let component: TableLayoutObjectSectionComponent;
  let fixture: ComponentFixture<TableLayoutObjectSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLayoutObjectSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLayoutObjectSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
