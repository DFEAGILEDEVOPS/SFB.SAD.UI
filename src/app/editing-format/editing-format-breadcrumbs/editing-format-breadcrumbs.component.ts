import { appSettings, AppSettings } from './../../core/config/settings/app-settings';
import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-editing-format-breadcrumbs',
  templateUrl: './editing-format-breadcrumbs.component.html',
  styleUrls: ['./editing-format-breadcrumbs.component.css']
})
export class EditingFormatBreadcrumbsComponent implements OnInit {

  @Input() urn: number;
  @Input() name: string;
  constructor(@Inject(appSettings) public settings: AppSettings) {

  }

  ngOnInit() {
  }

}
