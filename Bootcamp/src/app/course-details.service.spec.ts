import { TestBed, inject } from '@angular/core/testing';

import { CourseDetailsService } from './course-details.service';

describe('CourseDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseDetailsService]
    });
  });

  it('should be created', inject([CourseDetailsService], (service: CourseDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
