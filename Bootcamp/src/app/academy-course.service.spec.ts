import { TestBed, inject } from '@angular/core/testing';

import { AcademyCourseService } from './academy-course.service';

describe('AcademyCourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcademyCourseService]
    });
  });

  it('should be created', inject([AcademyCourseService], (service: AcademyCourseService) => {
    expect(service).toBeTruthy();
  }));
});
