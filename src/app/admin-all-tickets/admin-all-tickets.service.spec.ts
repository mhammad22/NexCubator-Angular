import { TestBed } from '@angular/core/testing';

import { AdminAllTicketsService } from './admin-all-tickets.service';

describe('AdminAllTicketsService', () => {
  let service: AdminAllTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAllTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
