import { TestBed } from '@angular/core/testing';

import { AdminAllSolvedTicketsService } from './admin-all-solved-tickets.service';

describe('AdminAllSolvedTicketsService', () => {
  let service: AdminAllSolvedTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAllSolvedTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
