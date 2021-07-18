import { TestBed } from '@angular/core/testing';

import { AddPitchService } from './add-pitch.service';

describe('AddPitchService', () => {
  let service: AddPitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
