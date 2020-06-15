import { appSettings, AppSettings } from '@core/config/settings/app-settings';
import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-sidebyside-breadcrumb',
  templateUrl: './sidebyside-breadcrumb.component.html',
  styleUrls: ['./sidebyside-breadcrumb.component.css']
})
export class SidebysideBreadcrumbComponent implements OnInit {


  @Input() urn: number;
  @Input() name: string;
  constructor(@Inject(appSettings) public settings: AppSettings) {

  }

  ngOnInit() {
  }

}
