import { TestBed } from '@angular/core/testing';

import { StudentInterestService } from './student-interest.service';

describe('StudentInterestService', () => {
  let service: StudentInterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentInterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
