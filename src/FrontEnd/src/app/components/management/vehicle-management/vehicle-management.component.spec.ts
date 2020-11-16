import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeManagementComponent } from './vehicle-management.component';

describe('VehiculeManagementComponent', () => {
  let component: VehiculeManagementComponent;
  let fixture: ComponentFixture<VehiculeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
