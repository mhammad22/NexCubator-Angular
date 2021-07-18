import { TestBed } from '@angular/core/testing';

import { AddStartupService } from './add-startup.service';

describe('AddStartupService', () => {
  let service: AddStartupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddStartupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
