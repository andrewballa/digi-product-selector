import { TestBed, inject } from '@angular/core/testing';

import { SelectorApiService } from './selector-api.service';

describe('SelectorApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectorApiService]
    });
  });

  it('should be created', inject([SelectorApiService], (service: SelectorApiService) => {
    expect(service).toBeTruthy();
  }));
});
