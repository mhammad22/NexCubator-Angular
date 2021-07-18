import { TestBed } from '@angular/core/testing';

import { StartupDetailService } from './startup-detail.service';

describe('StartupDetailService', () => {
  let service: StartupDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartupDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
