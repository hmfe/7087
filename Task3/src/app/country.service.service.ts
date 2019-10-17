import { Injectable } from '@angular/core';
import { Country } from './country.modal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countries: Country[] = [];

  constructor(private http: HttpClient) {
  }

  getCountries(country: string): Observable<Country[]> {
    let url = `https://restcountries.eu/rest/v2/name/${country}`;
    return this.http.get<Country[]>(url).pipe(
      map((data: any[]) => data.map((item: any) => new Country(item.name)))
    );
  }

}
