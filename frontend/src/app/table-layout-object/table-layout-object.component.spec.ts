import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLayoutObjectComponent } from './table-layout-object.component';

describe('TableLayoutObjectComponent', () => {
  let component: TableLayoutObjectComponent;
  let fixture: ComponentFixture<TableLayoutObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLayoutObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLayoutObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
