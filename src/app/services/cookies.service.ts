import { Injectable, Inject } from '@angular/core';
import * as $ from 'jquery';
import { appSettings, AppSettings } from '@core/config/settings/app-settings';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

constructor(@Inject(appSettings) public settings: AppSettings) {
}

public manageCookies() : boolean {
  var cookiesPolicyCookie = this.getCookie("cookies_policy_");
  if (!cookiesPolicyCookie) {
      let cookiesPolicyCookie = { "essential": true, "settings": false, "usage": false };
      this.setDomainCookie("cookies_policy_", JSON.stringify(cookiesPolicyCookie), { days: 365 }, this.settings.cookieDomain );
  }

  this.manageGACookies();

  return this.getCookie("cookies_preferences_set_") === "true";

}

public acceptAllCookies() {
  let cookiesPolicyCookie = { "essential": true, "settings": true, "usage": true };
  this.setDomainCookie("cookies_policy_", JSON.stringify(cookiesPolicyCookie), { days: 365 }, this.settings.cookieDomain );
  this.setDomainCookie("cookies_preferences_set_", "true", { days: 365 }, this.settings.cookieDomain );
}

public rejectAllCookies() {
  let cookiesPolicyCookie = { "essential": true, "settings": false, "usage": false };
  this.setDomainCookie("cookies_policy_", JSON.stringify(cookiesPolicyCookie), { days: 365 }, this.settings.cookieDomain );
  this.setDomainCookie("cookies_preferences_set_", "true", { days: 365 }, this.settings.cookieDomain );
}

private manageGACookies() {
  let cookiesPolicyCookie = JSON.parse(this.getCookie("cookies_policy_"));
  if (!cookiesPolicyCookie.usage)  {
      this.setCookie("_ga", '', { days: -1 });
      this.setCookie("_gat", '', { days: -1 });
      this.setCookie("_gid", '', { days: -1 });
  }
}

private setDomainCookie (name, value, options, domain) {
      if (typeof options === 'undefined') {
          options = {};
      }
      var cookieString = name + "=" + value + "; path=/";
      if (options.days) {
          var date = new Date();
          date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
          cookieString = cookieString + "; expires=" + date.toUTCString();
      }
      if (document.location.protocol == 'https:') {
          cookieString = cookieString + "; Secure";
      }
      cookieString = cookieString + "; samesite=lax";
      cookieString = cookieString + "; domain=" + domain;
      document.cookie = cookieString;
};

private setCookie (name, value, options) {
  if(typeof options === 'undefined') {
    options = {};
  }
  var cookieString = name + "=" + value + "; path=/";
  if (options.days) {
    var date = new Date();
    date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
    cookieString = cookieString + "; expires=" + date.toUTCString();
  }
  if (document.location.protocol == 'https:'){
    cookieString = cookieString + "; Secure";
  }
  cookieString = cookieString + "; samesite=lax";
  document.cookie = cookieString;
};

private getCookie (name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(';');
  for (let i = 0, len = cookies.length; i < len; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
};


}
