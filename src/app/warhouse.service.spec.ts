import { TestBed } from '@angular/core/testing';

import { WarhouseService } from './warhouse.service';

describe('WarhouseService', () => {
  let service: WarhouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarhouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
