import { Component, OnInit, Inject } from '@angular/core';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(@Inject(appSettings) public settings: AppSettings) {
  }

  ngOnInit() {

  }

}
