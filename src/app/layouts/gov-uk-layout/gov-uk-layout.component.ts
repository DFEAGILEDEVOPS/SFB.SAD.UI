import { CookiesService } from './../../services/cookies.service';
import { Location } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { ViewModeService } from 'app/services/viewMode.service';

@Component({
  selector: 'app-gov-uk-layout',
  templateUrl: './gov-uk-layout.component.html',
  styleUrls: ['./gov-uk-layout.component.scss']
})
export class GovUkLayoutComponent implements OnInit {

  constructor(
    @Inject(appSettings) public settings: AppSettings,
    private cookiesService: CookiesService,
    private location: Location,
    private viewModeService: ViewModeService) {  }

  ngOnInit() {
    this.cookiesService.manageCookies();
  }

  acceptAllCookies() {
    this.cookiesService.acceptAllCookies();
  }

  acceptedHide() {
    this.cookiesService.acceptedHide();
  }

  onBack() {
    this.location.back();
  }

  isInEditMode(){
    return this.viewModeService.isEditMode();
  }


}
