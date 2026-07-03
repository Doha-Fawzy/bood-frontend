import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLang: string = 'en';

  constructor(private translate: TranslateService) {}

  initLanguage() {
    this.translate.setFallbackLang('en');
    const savedLang = localStorage.getItem('lang') || 'en';
    this.currentLang = savedLang;
    this.setLanguage(this.currentLang);
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.setLanguage(this.currentLang);
  }

  private setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }
}
