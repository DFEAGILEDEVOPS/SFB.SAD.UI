import { AppSettings } from '../../core/config/settings/app-settings';
import { environment } from '@env/environment';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { appSettings } from '@core/config/settings/app-settings';

@Component({
  selector: 'app-dashboard-bread-crumb',
  templateUrl: './dashboard-bread-crumb.component.html',
  styleUrls: ['./dashboard-bread-crumb.component.scss']
})
export class DashboardBreadcrumbComponent implements OnInit {

  @Input() urn: number;
  @Input() name: string;
  constructor(@Inject(appSettings) public settings: AppSettings) {

  }

  ngOnInit() {
  }
 
}
