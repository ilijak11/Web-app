import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStorageUnitsComponent } from './register-storage-units.component';

describe('RegisterStorageUnitsComponent', () => {
  let component: RegisterStorageUnitsComponent;
  let fixture: ComponentFixture<RegisterStorageUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterStorageUnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStorageUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
