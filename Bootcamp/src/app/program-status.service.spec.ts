import { TestBed, inject } from '@angular/core/testing';

import { ProgramStatusService } from './program-status.service';

describe('ProgramStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramStatusService]
    });
  });

  it('should be created', inject([ProgramStatusService], (service: ProgramStatusService) => {
    expect(service).toBeTruthy();
  }));
});
