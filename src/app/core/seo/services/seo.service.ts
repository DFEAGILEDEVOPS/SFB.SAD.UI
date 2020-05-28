import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { MetaName, MetaProperty, MetaTag } from '../models';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SeoService {

  constructor(@Inject(DOCUMENT) private document,
    private ngTitle: Title,
    private ngMeta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  get metaInstance(): Meta {
    return this.ngMeta;
  }

  /**
   * @description Set General SEO Meta Tags
   * @param metaTag: MetaTag
   * @return void
   */
  setTags(metaTag: MetaTag): void {
    if (metaTag.title !== undefined) {
      this.title(metaTag.title, metaTag.titleSuffix);
    }
    if (metaTag.description !== undefined) {
      this.description(metaTag.description);
    }
    if (metaTag.image !== undefined) {
      this.image(metaTag.image);
    }
    if (metaTag.url !== undefined) {
      this.url(metaTag.url);
    }
    if (metaTag.author !== undefined) {
      this.author(metaTag.author);
    }
    if (metaTag.robots !== undefined) {
      this.robots(metaTag.robots);
    }
  }

  /**
   * @description Set General SEO Meta Tags
   * @param defaultMetaTag: MetaTag
   * @return void
   */
  generateTags(defaultMetaTag?: MetaTag): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    ).subscribe((data) => {
      const metatag: MetaTag = Object.assign({}, defaultMetaTag, data);
      this.setTags(metatag);
    });
  }

  /**
   * @description Set Name Tag
   * @param metaName: MetaName
   * @param content: string
   * @return void
   */
  setNameTag(metaName: MetaName): void {
    const property = {
      name: metaName.name,
      content: metaName.content,
    };
    if (this.ngMeta.getTag(`name="${property.name}"`)) {
      this.ngMeta.updateTag(property);
    } else {
      this.ngMeta.addTag(property);
    }
  }

  /**
   * @description Set Name Tags
   * @param metaNames: [MetaName]
   * @return void
   */
  setNameTags(metaNames: [MetaName]): void {
    metaNames.forEach(prop => {
      this.setNameTag(prop);
    });
  }

  /**
   * @description Set Property Tag
   * @param metaProperty: MetaProperty
   * @param content: string
   * @return void
   */
  setPropertyTag(metaProperty: MetaProperty): void {
    const property = {
      property: metaProperty.property,
      content: metaProperty.content,
    };
    if (this.ngMeta.getTag(`property="${property.property}"`)) {
      this.ngMeta.updateTag(property);
    } else {
      this.ngMeta.addTag(property);
    }
  }

  /**
   * @description Set Property Tags
   * @param properties: [MetaProperty]
   * @return void
   */
  setPropertyTags(properties: [MetaProperty]): void {
    properties.forEach(prop => {
      this.setPropertyTag(prop);
    });
  }

  /**
   * @description Set Title Tag
   * @param title: string
   * @param titleSuffix: string
   * @return void
   */
  title(title: string, titleSuffix?: string): void {
    const setTitle = (titleSuffix !== undefined && titleSuffix !== '') ? `${title} ${titleSuffix}` : title;
    this.ngTitle.setTitle(setTitle);
    this.setPropertyTag({ property: 'og:title', content: setTitle });
    this.setPropertyTag({ property: 'twitter:title', content: setTitle });
  }

  /**
   * @description Set Description Tag
   * @param content: string
   * @return void
   */
  description(content: string): void {
    this.setNameTag({ name: 'description', content });
    this.setPropertyTag({ property: 'og:description', content });
    this.setPropertyTag({ property: 'twitter:description', content });
  }

  /**
   * @description Set Image Tag
   * @param content: string
   * @return void
   */
  image(content: string): void {
    this.setPropertyTag({ property: 'twitter:image', content });
    this.setPropertyTag({ property: 'og:image', content });
    this.setPropertyTag({ property: 'og:image:secure_url', content });
  }

  /**
   * @description Set URL Tag
   * @param content: string
   * @return void
   */
  url(content: string): void {
    this.ngMeta.updateTag({ property: 'og:url', content });
    this.setCanonicalURL(content);
  }

  /**
   * @description: Set Author Tag
   * @param content: string
   */
  author(content: string): void {
    this.setNameTag({ name: 'author', content });
  }

  /**
   * @description: Set Robots Tag
   * @param content: string
   */
  robots(content: string): void {
    this.setNameTag({ name: 'robots', content });
  }

  /**
   * @description: Set Canonical URL
   * @param url: URL
   */
  setCanonicalURL(url?: string) {
    // first remove potential previous url
    const selector = `link[rel='canonical']`;
    const canonicalElement = this.document.head.querySelector(selector);
    if (canonicalElement) {
      this.document.head.removeChild(canonicalElement);
    }
    if (url && url.length) {
      const link: HTMLLinkElement = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
      link.setAttribute('href', url);
    }
  }

}
