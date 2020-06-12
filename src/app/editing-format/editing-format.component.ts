import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editing-format',
  templateUrl: './editing-format.component.html',
  styleUrls: ['./editing-format.component.css']
})
export class EditingFormatComponent implements OnInit {
  urn: number;
  name: string;
  editType: string;

  @ViewChild('editFormatForm')
  private form: NgForm;

  constructor(private route: ActivatedRoute, private router: Router) {
      this.route.params.subscribe(params => {
        this.urn = +params.urn;
        this.name = params.name;
      });
  }

  ngOnInit() { }

  onContinue() {
    if (this.form.valid) {
      if (this.editType === 'FinancialFigures') {
        this.router.navigate(['self-assessment/edit-data', this.urn, 'edit']);
      } else {
        this.router.navigate(['self-assessment/edit-data', this.urn, 'edit']);
      }
    }
  }

}
