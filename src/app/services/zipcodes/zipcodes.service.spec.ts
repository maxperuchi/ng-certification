import { TestBed } from '@angular/core/testing';

import { ZipcodesService } from './zipcodes.service';

describe('ZipcodesService', () => {
  let service: ZipcodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZipcodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
