import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Inject, OnInit } from '@angular/core';
import { AppSettings, appSettings } from '@core/config/settings/app-settings';
import { CookiesService } from 'app/services/cookies.service';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent implements OnInit {
  public cookiesAccepted: Boolean;
  public cookiesRejected: Boolean;
  public cookiesSetAndConfirmed: Boolean;

  constructor(
    private cookiesService: CookiesService
  ){ }

  ngOnInit() {
    this.cookiesSetAndConfirmed = this.cookiesService.manageCookies();
  }

  acceptAllCookies() {
    this.cookiesService.acceptAllCookies();
    this.cookiesAccepted = true;
  }

  rejectAllCookies() {
    this.cookiesService.rejectAllCookies();
    this.cookiesRejected = true;
  }

  bannerHide() {
    this.cookiesSetAndConfirmed = true;
  }

}
