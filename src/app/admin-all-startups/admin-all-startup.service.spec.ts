import { TestBed } from '@angular/core/testing';

import { AdminAllStartupService } from './admin-all-startup.service';

describe('AdminAllStartupService', () => {
  let service: AdminAllStartupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAllStartupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
