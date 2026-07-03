import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-partners-carousel',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './partners-carousel.component.html',
  styleUrl: './partners-carousel.component.css'
})
export class PartnersCarouselComponent {
  partners = [
    '/assets/bood-design/images/partners/partner-1.png',
    '/assets/bood-design/images/partners/partner-2.png',
    '/assets/bood-design/images/partners/partner-3.png',
    '/assets/bood-design/images/partners/partner-5.png',
    '/assets/bood-design/images/partners/partner-6.png',
    '/assets/bood-design/images/partners/partner-7.png',
    '/assets/bood-design/images/partners/partner-11.jpg',
    '/assets/bood-design/images/partners/partner-12.png',
    '/assets/bood-design/images/partners/partner-13.png',
    '/assets/bood-design/images/partners/partner-14.png'
  ];
}
