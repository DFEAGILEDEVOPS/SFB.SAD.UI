import { Component, OnInit, Input, Inject } from '@angular/core';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-sidebyside-format-breadcrumbs',
  templateUrl: './sidebyside-format-breadcrumbs.component.html',
  styleUrls: ['./sidebyside-format-breadcrumbs.component.css']
})
export class SidebysideFormatBreadcrumbsComponent implements OnInit {

  @Input() urn: number;
  @Input() name: string;
  constructor(@Inject(appSettings) public settings: AppSettings) {

  }

  ngOnInit() {
  }

}
