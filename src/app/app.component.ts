import { Component, OnInit, Inject } from '@angular/core';
import { SeoService } from '@core/seo/services/seo.service';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(@Inject(appSettings) private settings: AppSettings, private seo: SeoService) { }

  ngOnInit() {
    this.seo.generateTags(this.settings.seo);
  }

}
