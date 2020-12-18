import { Component, OnInit } from '@angular/core';
import { TitleService } from 'app/services/title.service';

@Component({
  selector: 'app-NotFoundError',
  templateUrl: './NotFoundError.component.html',
  styleUrls: ['./NotFoundError.component.css']
})
export class NotFoundErrorComponent implements OnInit {

  constructor(titleService: TitleService) {
    titleService.setWithPrefix("Page not found"); }

  ngOnInit() {
  }

}
