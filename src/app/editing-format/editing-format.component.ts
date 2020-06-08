import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editing-format',
  templateUrl: './editing-format.component.html',
  styleUrls: ['./editing-format.component.css']
})
export class EditingFormatComponent implements OnInit {
  urn: number;
  name: string;
  editType: string;

  constructor(private route: ActivatedRoute, private router: Router) {
      this.route.params.subscribe(params => {
        this.urn = +params.urn;
        this.name = params.name;
      });
  }

  ngOnInit() { }

  onContinue() {
    if (this.editType === 'FinancialFigures') {
      this.router.navigate(['self-assessment/edit-data', this.urn]);
    } else {
      this.router.navigate(['self-assessment/edit-data', this.urn]);
    }
  }

}
