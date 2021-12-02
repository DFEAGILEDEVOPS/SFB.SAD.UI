import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    CookieBannerComponent,
    NotFoundComponent],
  exports: [
      HeaderComponent,
      FooterComponent,
      CookieBannerComponent,
      NotFoundComponent]
})
export class GovUkLayoutModule { }
