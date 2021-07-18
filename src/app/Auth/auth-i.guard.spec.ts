import { TestBed } from '@angular/core/testing';

import { AuthIGuard } from './auth-i.guard';

describe('AuthIGuard', () => {
  let guard: AuthIGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthIGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
