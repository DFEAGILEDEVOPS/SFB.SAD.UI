import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private titleService: Title) {

  }

  setWithPrefix(prefix: string) {
    this.titleService.setTitle(`${prefix} - Schools Financial Benchmarking - GOV.UK`);
  }

}
