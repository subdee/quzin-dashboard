import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {CacheService} from "ng2-cache/src/services/cache.service";

@Injectable()
export class ApiService {
  username: string = 'api';
  password: string = 'somerandomtoken';
  apiEndpoint: string = 'http://quzin.subdee.org/api';

  dailyRecipeObservable: Observable<any>;
  seasonalsObservable: Observable<any>;

  constructor(public http: Http, private cacheService: CacheService) {
    this.cacheService.setGlobalPrefix('quzin');
  }

  generateAuthHeaders() {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));

    return headers;
  }

  getAllItems() {
    return this.http.get(this.apiEndpoint + '/recipes', {
      headers: this.generateAuthHeaders()
    }).map(res => res.json());
  }

  getShoppingList() {
    return this.http.get(this.apiEndpoint + '/shoppingList', {
      headers: this.generateAuthHeaders()
    }).map(res => res.json());
  }

  saveToShoppingList(id) {
    return this.http.post(this.apiEndpoint + '/shoppingList/' + id, [], {
      headers: this.generateAuthHeaders()
    }).map(res => res.json());
  }

  removeFromShoppingList(id) {
    return this.http.delete(this.apiEndpoint + '/shoppingList/' + id, {
      headers: this.generateAuthHeaders()
    }).map(res => res.json());
  }

  addNewItem(name) {
    return this.http.post(this.apiEndpoint + '/recipes', {name: name}, {
      headers: this.generateAuthHeaders()
    }).map(res => res.json());
  }

  getSeasonalItems() {
    let data: any|null = this.cacheService.get('seasonalitems');
    if (data) {
      return Observable.of(data);
    } else if (this.seasonalsObservable) {
      return this.seasonalsObservable;
    } else {
      this.seasonalsObservable = this.http.get(this.apiEndpoint + '/seasonals', {
        headers: this.generateAuthHeaders()
      }).map(res => {
        this.seasonalsObservable = null;
        let result = res.json();
        this.cacheService.set('seasonalitems', result, {maxAge: 24 * 60 * 60});
        return result;
      }).share();
      return this.seasonalsObservable;
    }
  }

  getWeather() {
    return this.http.get(this.apiEndpoint + '/weather', {
      headers: this.generateAuthHeaders()
    }).map(res => res.json());
  }

  getDailyRecipe() {
    let data: any|null = this.cacheService.get('dailyrecipe');
    if (data) {
      return Observable.of(data);
    } else if (this.dailyRecipeObservable) {
      return this.dailyRecipeObservable;
    } else {
      this.dailyRecipeObservable = this.http.get(this.apiEndpoint + '/dailyrecipe', {
        headers: this.generateAuthHeaders()
      }).map(res => {
        this.dailyRecipeObservable = null;
        let result = res.json();
        this.cacheService.set('dailyrecipe', result, {maxAge: 6 * 60 * 60});
        return result;
      }).share();
      return this.dailyRecipeObservable;
    }
  }

  getRecipes() {
    return this.http.get(this.apiEndpoint + '/recipes', {
      headers: this.generateAuthHeaders()
    }).map(res => res.json());
  }
}
