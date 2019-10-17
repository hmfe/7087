import { TestBed } from '@angular/core/testing';

import { Country.ServiceService } from './country.service.service';

describe('Country.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Country.ServiceService = TestBed.get(Country.ServiceService);
    expect(service).toBeTruthy();
  });
});
