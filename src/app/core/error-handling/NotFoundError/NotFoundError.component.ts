import { Component, OnInit } from '@angular/core';
import { TitleService } from 'app/services/title.service';
import { ViewModeService } from 'app/services/viewMode.service';

@Component({
  selector: 'app-NotFoundError',
  templateUrl: './NotFoundError.component.html',
  styleUrls: ['./NotFoundError.component.css']
})
export class NotFoundErrorComponent implements OnInit {

  constructor(titleService: TitleService,
    viewModeService: ViewModeService) {
    viewModeService.setDashboardMode();
    titleService.setWithPrefix("Page not found"); }

  ngOnInit() {
  }

}
