import { appSettings, AppSettings } from './../../core/config/settings/app-settings';
import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-data-breadcrumb',
  templateUrl: './edit-data-breadcrumb.component.html',
  styleUrls: ['./edit-data-breadcrumb.component.css']
})
export class EditDataBreadcrumbComponent implements OnInit {

  @Input() urn: number;
  @Input() name: string;
  constructor(@Inject(appSettings) public settings: AppSettings) {

  }

  ngOnInit() {
  }

}
