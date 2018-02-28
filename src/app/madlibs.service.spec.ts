import {inject, TestBed} from '@angular/core/testing';

import {MadlibsService} from './madlibs.service';

describe('MadlibsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MadlibsService]
    });
  });

  it('should be created', inject([MadlibsService], (service: MadlibsService) => {
    expect(service).toBeTruthy();
  }));
});
