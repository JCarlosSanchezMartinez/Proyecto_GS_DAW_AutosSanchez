import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocheDetallesComponent } from './coche-detalles.component';

describe('CocheDetallesComponent', () => {
  let component: CocheDetallesComponent;
  let fixture: ComponentFixture<CocheDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CocheDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocheDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
