import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage() {
    const savedLang = localStorage.getItem('app_lang') || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('app_lang', lang);
    this.currentLangSubject.next(lang);
    this.updateLayoutDirection(lang);
  }

  private updateLayoutDirection(lang: string) {
    const htmlElement = document.documentElement;
    if (lang === 'ar') {
      htmlElement.setAttribute('dir', 'rtl');
      htmlElement.setAttribute('lang', 'ar');
    } else {
      htmlElement.setAttribute('dir', 'ltr');
      htmlElement.setAttribute('lang', 'en');
    }
  }

  getCurrentLanguage(): string {
    return this.currentLangSubject.value;
  }
}

