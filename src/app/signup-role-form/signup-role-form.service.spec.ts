import { TestBed } from '@angular/core/testing';

import { SignupRoleFormService } from './signup-role-form.service';

describe('SignupRoleFormService', () => {
  let service: SignupRoleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupRoleFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
