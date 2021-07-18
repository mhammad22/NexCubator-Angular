import { TestBed } from '@angular/core/testing';

import { ViewUserProfileService } from './view-user-profile.service';

describe('ViewUserProfileService', () => {
  let service: ViewUserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewUserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
