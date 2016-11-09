import {Component, OnInit} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'shoppinglist-detail',
  templateUrl: 'shoppinglist-detail.component.html',
  styleUrls: ['shoppinglist-detail.component.css'],
  providers: [ApiService]
})
export class ShoppingListDetailComponent implements OnInit {
  items: any = [];
  loading: boolean;
  api: ApiService;

  constructor(api: ApiService, private titleService: Title, private translateService: TranslateService) {
    this.api = api;
    this.loadShoppingList();
  }

  ngOnInit() {
    this.translateService.get('titles.shoppinglist').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }

  loadShoppingList() {
    this.loading = true;
    this.api.getShoppingList().subscribe(data => {
      this.items = data;
      this.loading = false;
    });
  }

  removeItem(item) {
    this.api.removeFromShoppingList(item.id).subscribe(data => {
      if (data.success) {
        this.loadShoppingList();
      }
    });
  }
}
