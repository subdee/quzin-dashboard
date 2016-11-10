import {Component, OnInit} from '@angular/core';
import {TranslateService} from "ng2-translate";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private titleService: Title, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.translateService.get('titles.dashboard').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
}
