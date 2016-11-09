import {Component, OnInit} from '@angular/core';
import {TranslateService} from "ng2-translate";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: Title;

  ngOnInit() {
    this.titleService.setTitle('Quzin');
  }

  constructor(private translate: TranslateService, private router: Router, private titleService: Title) {
    this.title = this.titleService;
    this.router = router;
    this.translate = translate;
    this.translateConfig();
  }

  translateConfig() {
    var userLang = navigator.language.split('-')[0];
    userLang = /(el)/gi.test(userLang) ? userLang : 'el';
    this.translate.setDefaultLang('el');
    this.translate.use(userLang);
  }
}
