import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryManagementComponent } from './gallery-management.component';

describe('GalleryManagementComponent', () => {
  let component: GalleryManagementComponent;
  let fixture: ComponentFixture<GalleryManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
