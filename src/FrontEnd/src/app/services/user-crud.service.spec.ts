import { TestBed } from '@angular/core/testing';

import { UserCrudService } from './user-crud.service';

describe('UserCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCrudService = TestBed.get(UserCrudService);
    expect(service).toBeTruthy();
  });
});
