import {Component} from "@angular/core";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'shoppinglist',
  templateUrl: 'shoppinglist.component.html',
  styleUrls: ['shoppinglist.component.css'],
  providers: [ApiService]
})
export class ShoppingListComponent {
  items: any = [];

  constructor(api: ApiService) {
    api.getShoppingList().subscribe(data => {
      this.items = data;
    });
  }
}
