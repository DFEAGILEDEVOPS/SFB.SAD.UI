import { Component, OnInit } from '@angular/core';
import { SeoService } from '@core/seo/services/seo.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.addMetaTags();
  }

  addMetaTags() {
    this.seo.setTags({
      title: 'Page not found'
    });
  }

}
