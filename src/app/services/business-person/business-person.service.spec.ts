import { TestBed } from '@angular/core/testing';

import { BusinessPersonService } from './business-person.service';

describe('BusinessPersonService', () => {
  let service: BusinessPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
