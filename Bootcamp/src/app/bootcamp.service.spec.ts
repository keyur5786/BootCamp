import { TestBed, inject } from '@angular/core/testing';

import { BootcampService } from './bootcamp.service';

describe('BootcampService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BootcampService]
    });
  });

  it('should be created', inject([BootcampService], (service: BootcampService) => {
    expect(service).toBeTruthy();
  }));
});
