import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoVehicleComponent } from './auto-vehicle.component';

describe('AutoVehicleComponent', () => {
  let component: AutoVehicleComponent;
  let fixture: ComponentFixture<AutoVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
