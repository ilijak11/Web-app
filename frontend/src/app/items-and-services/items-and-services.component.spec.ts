import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsAndServicesComponent } from './items-and-services.component';

describe('ItemsAndServicesComponent', () => {
  let component: ItemsAndServicesComponent;
  let fixture: ComponentFixture<ItemsAndServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsAndServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsAndServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
