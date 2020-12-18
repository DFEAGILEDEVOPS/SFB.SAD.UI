import { Component, OnInit } from '@angular/core';
import { TitleService } from 'app/services/title.service';

@Component({
  selector: 'app-ServiceProblem',
  templateUrl: './ServiceProblem.component.html',
  styleUrls: ['./ServiceProblem.component.css']
})
export class ServiceProblemComponent implements OnInit {

  constructor(titleService: TitleService) {
    titleService.setWithPrefix("Sorry, there is a problem with the service");
  }

  ngOnInit() {
  }

}
