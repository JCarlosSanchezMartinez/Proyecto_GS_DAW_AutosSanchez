import { TestBed } from '@angular/core/testing';

import { VehicleCRUDService } from './vehicle-crud.service';

describe('VehicleCRUDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleCRUDService = TestBed.get(VehicleCRUDService);
    expect(service).toBeTruthy();
  });
});
