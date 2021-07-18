import { TestBed } from '@angular/core/testing';

import { ExploreStartupService } from './explore-startup.service';

describe('ExploreStartupService', () => {
  let service: ExploreStartupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreStartupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
