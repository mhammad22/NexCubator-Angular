import { TestBed } from '@angular/core/testing';

import { ExploreStartupInvestorService } from './explore-startup-investor.service';

describe('ExploreStartupInvestorService', () => {
  let service: ExploreStartupInvestorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreStartupInvestorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
