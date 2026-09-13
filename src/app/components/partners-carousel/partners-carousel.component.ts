import { Component, PLATFORM_ID, Inject, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-partners-carousel',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './partners-carousel.component.html',
  styleUrl: './partners-carousel.component.css'
})
export class PartnersCarouselComponent {
  partners = [
    environment.apiUrl + '/uploads/partners/partner-1.png',
    environment.apiUrl + '/uploads/partners/partner-2.png',
    environment.apiUrl + '/uploads/partners/partner-3.png',
    environment.apiUrl + '/uploads/partners/partner-5.png',
    environment.apiUrl + '/uploads/partners/partner-6.png',
    environment.apiUrl + '/uploads/partners/partner-7.png',
    environment.apiUrl + '/uploads/partners/partner-11.jpg',
    environment.apiUrl + '/uploads/partners/partner-12.png',
    environment.apiUrl + '/uploads/partners/partner-13.png',
    environment.apiUrl + '/uploads/partners/partner-14.png'
  ];
}
