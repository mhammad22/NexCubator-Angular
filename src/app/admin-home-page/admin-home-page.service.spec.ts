import { TestBed } from '@angular/core/testing';

import { AdminHomePageService } from './admin-home-page.service';

describe('AdminHomePageService', () => {
  let service: AdminHomePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHomePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
