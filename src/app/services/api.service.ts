import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {CacheService} from "ng2-cache/src/services/cache.service";

@Injectable()
export class ApiService {
  username: string = 'api';
  password: string = 'somerandomtoken';
  apiEndpoint: string = 'http://localhost:8000/api';

  dailyRecipeObservable: Observable<any>;
  seasonalsObservable: Observable<any>;
  weatherObservable: Observable<any>;
  shoppingListObservable: Observable<any>;
  recipeObservable: Observable<any>;

  constructor(public http: Http, private cacheService: CacheService) {
    this.cacheService.setGlobalPrefix('quzin');
  }

  generateAuthHeaders() {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));

    return headers;
  }

  getAllItems() {
    return this.http.get(this.apiEndpoint + '/items', {
      headers: this.generateAuthHeaders()
    }).map(res => res.json());
  }

  getShoppingList() {
    let data: any|null = this.cacheService.get('shoppinglist');
    if (data) {
      return Observable.of(data);
    } else if (this.shoppingListObservable) {
      return this.shoppingListObservable;
    } else {
      this.shoppingListObservable = this.http.get(this.apiEndpoint + '/shoppingList', {
      headers: this.generateAuthHeaders()
      }).map(res => {
        this.shoppingListObservable = null;
        let result = res.json();
        this.cacheService.set('shoppinglist', result, {maxAge: 60 * 60});
        return result;
      }).share();
      return this.shoppingListObservable;
    }
  }

  saveToShoppingList(id) {
    this.cacheService.remove('shoppinglist');
    return this.http.post(this.apiEndpoint + '/shoppingList/' + id, [], {
      headers: this.generateAuthHeaders()
    }).map(res => res.json());
  }

  removeFromShoppingList(id) {
    this.cacheService.remove('shoppinglist');
    return this.http.delete(this.apiEndpoint + '/shoppingList/' + id, {
      headers: this.generateAuthHeaders()
    }).map(res => res.json());
  }

  addNewRecipe(title, url) {
    this.cacheService.remove('recipes');
    return this.http.put(this.apiEndpoint + '/recipes', {title: title, url: url}, {
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
    let data: any|null = this.cacheService.get('weather');
    if (data) {
      return Observable.of(data);
    } else if (this.weatherObservable) {
      return this.weatherObservable;
    } else {
      this.weatherObservable = this.http.get(this.apiEndpoint + '/weather', {
      headers: this.generateAuthHeaders()
      }).map(res => {
        this.weatherObservable = null;
        let result = res.json();
        this.cacheService.set('weather', result, {maxAge: 30 * 60});
        return result;
      }).share();
      return this.weatherObservable;
    }
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
    let data: any|null = this.cacheService.get('recipes');
    if (data) {
      return Observable.of(data);
    } else if (this.recipeObservable) {
      return this.recipeObservable;
    } else {
      this.recipeObservable = this.http.get(this.apiEndpoint + '/recipes', {
      headers: this.generateAuthHeaders()
      }).map(res => {
        this.recipeObservable = null;
        let result = res.json();
        this.cacheService.set('recipes', result, {maxAge: 6 * 60 * 60});
        return result;
      }).share();
      return this.recipeObservable;
    }
  }

  searchRecipe(term) {
    return this.http.get(this.apiEndpoint + '/recipes/' + term, {
      headers: this.generateAuthHeaders()
    }).map(res => res.json());
  }
}
