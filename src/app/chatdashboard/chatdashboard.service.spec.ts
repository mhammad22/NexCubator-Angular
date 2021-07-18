import { TestBed } from '@angular/core/testing';

import { ChatdashboardService } from './chatdashboard.service';

describe('ChatdashboardService', () => {
  let service: ChatdashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatdashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
