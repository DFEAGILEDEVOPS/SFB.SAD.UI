import { CookiesService } from './../../services/cookies.service';
import { Location } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { ViewModeService } from 'app/services/viewMode.service';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-gov-uk-layout',
  templateUrl: './gov-uk-layout.component.html',
  styleUrls: ['./gov-uk-layout.component.scss']
})
export class GovUkLayoutComponent implements OnInit {

  constructor(
    @Inject(appSettings) public settings: AppSettings,
    private location: Location,
    private viewModeService: ViewModeService,
    private markdownService: MarkdownService) {  }

  ngOnInit() {
    this.markdownService.renderer.link = (href: string | null, _title: string | null, text: string) => {
      return `<a href="${href}" class="govuk-notification-banner__link">${text}</a>`;
    }
  }

  onBack() {
    this.location.back();
  }

  isInEditMode(){
    return this.viewModeService.isEditMode();
  }


}
