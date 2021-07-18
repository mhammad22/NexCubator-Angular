import { TestBed } from '@angular/core/testing';

import { ViewServicesService } from './view-services.service';

describe('ViewServicesService', () => {
  let service: ViewServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
