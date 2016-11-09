import {Component} from "@angular/core";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'seasonals',
  templateUrl: 'seasonals.component.html',
  styleUrls: ['seasonals.component.css'],
  providers: [ApiService]
})
export class SeasonalsComponent {
  seasonals: any = [];

  constructor(api: ApiService) {
    let that = this;

    api.getSeasonalItems().subscribe(data => {
      data.forEach(category => {
        category.items.toString = function () {
          return this.name + ', ';
        };
        that.seasonals.push({
          name: category.name, items: category.items.map(item => {
            return item.name
          })
        });
      })
    });
  }
}
