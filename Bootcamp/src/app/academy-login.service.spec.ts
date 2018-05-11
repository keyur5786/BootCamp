import { TestBed, inject } from '@angular/core/testing';

import { AcademyLoginService } from './academy-login.service';

describe('AcademyLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcademyLoginService]
    });
  });

  it('should be created', inject([AcademyLoginService], (service: AcademyLoginService) => {
    expect(service).toBeTruthy();
  }));
});
