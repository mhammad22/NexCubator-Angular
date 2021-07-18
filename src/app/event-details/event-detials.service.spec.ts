import { TestBed } from '@angular/core/testing';

import { EventDetialsService } from './event-detials.service';

describe('EventDetialsService', () => {
  let service: EventDetialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventDetialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
