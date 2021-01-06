import { Component, OnInit } from '@angular/core';
import { TitleService } from 'app/services/title.service';
import { ViewModeService } from 'app/services/viewMode.service';

@Component({
  selector: 'app-ServiceProblem',
  templateUrl: './ServiceProblem.component.html',
  styleUrls: ['./ServiceProblem.component.css']
})
export class ServiceProblemComponent implements OnInit {

  constructor(titleService: TitleService, viewModeService: ViewModeService) {
    viewModeService.setDashboardMode(); 
    titleService.setWithPrefix("Sorry, there is a problem with the service");
  }

  ngOnInit() {
  }

}
