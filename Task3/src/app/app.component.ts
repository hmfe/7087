import { Component } from '@angular/core';
import { SearchHistory } from './searchhistory.modal';
import { Country } from './country.modal';
import { CountryService } from './country.service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchHistories: SearchHistory[] = [];
  public countries: Country[];
  public searchText: string;
  private subscription: Subscription;
  constructor(private countryService: CountryService) {

  }
  saveSearchText(country: Country) {
    const index = this.searchHistories.findIndex(x => x.SearchText.toLowerCase() == this.searchText.toLowerCase());
    if (index > -1) {
      console.log('already exist');
    }
    else {
      this.searchHistories.push(new SearchHistory(country.name, new Date()));
      console.log(this.searchHistories);
    }
    this.searchText = country.name;
    this.countries = null;
  }

  searchCountries() {
    if (this.searchText === null || this.searchText === undefined || this.searchText === '') {
      this.countries = null;
    }
    else {
      this.subscription =
        this.countryService.getCountries(this.searchText)
          .subscribe(data => this.countries = data,
            (error: HttpErrorResponse) => {
             
              this.countries = null;
              this.subscription.unsubscribe();
            });
    }
  }

  removeHistory(searchHistory: SearchHistory) {
    const index = this.searchHistories.findIndex(x => x.SearchText == searchHistory.SearchText);
    if (index > -1) {
      this.searchHistories.splice(index, 1);
    }
  }

  removeAllHistory(): void {
    this.searchHistories = [];
  }

}

