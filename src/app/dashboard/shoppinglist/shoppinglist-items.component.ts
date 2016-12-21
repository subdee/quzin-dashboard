import {Component} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {TranslateService} from "ng2-translate";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";

@Component({
  selector: 'shoppinglist-items',
  templateUrl: 'shoppinglistitems.component.html',
  providers: [ApiService]
})
export class ShoppingListItemsComponent {
  itemTypes: any = [];
  loading: boolean;
  api: ApiService;
  snackBar: MdSnackBar;

  constructor(api: ApiService, private translateService: TranslateService, snackBar: MdSnackBar) {
    this.api = api;
    this.snackBar = snackBar;
    this.loadItems();
  }

  loadItems() {
    this.loading = true;
    this.api.getAllItems().subscribe(data => {
      this.itemTypes = data;
      this.loading = false;
    });
  }

  addToShoppingList(item) {
    let config = new MdSnackBarConfig();
    config.duration = 3000;
    this.api.saveToShoppingList(item.id).subscribe(data => {
      if (data.success) {
        this.translateService.get('snacks.shoppinglist.saved').subscribe((res: string) => {
          this.snackBar.open(res, null, config);
        });
      } else {
        this.translateService.get('snacks.shoppinglist.failed').subscribe((res: string) => {
          this.snackBar.open(res, null, config);
        });
      }
    });
  }
}
