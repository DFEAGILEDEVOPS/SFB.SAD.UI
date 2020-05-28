import { Component, OnInit, Inject } from '@angular/core';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(appSettings) public settings: AppSettings) { }

  ngOnInit() {

  }

}
