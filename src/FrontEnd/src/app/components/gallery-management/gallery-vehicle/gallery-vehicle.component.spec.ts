import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryVehicleComponent } from './gallery-vehicle.component';

describe('GalleryVehicleComponent', () => {
  let component: GalleryVehicleComponent;
  let fixture: ComponentFixture<GalleryVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
