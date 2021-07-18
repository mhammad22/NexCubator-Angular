import { TestBed } from '@angular/core/testing';

import { InvestorStartConvoService } from './investor-start-convo.service';

describe('InvestorStartConvoService', () => {
  let service: InvestorStartConvoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestorStartConvoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
