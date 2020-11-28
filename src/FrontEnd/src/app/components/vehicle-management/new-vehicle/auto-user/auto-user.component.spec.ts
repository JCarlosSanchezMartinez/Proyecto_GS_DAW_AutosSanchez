import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoUserComponent } from './auto-user.component';

describe('AutoUserComponent', () => {
  let component: AutoUserComponent;
  let fixture: ComponentFixture<AutoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
