import { TestBed, inject } from '@angular/core/testing';

import { SearchCourceService } from './search-cource.service';

describe('SearchCourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchCourceService]
    });
  });

  it('should be created', inject([SearchCourceService], (service: SearchCourceService) => {
    expect(service).toBeTruthy();
  }));
});
