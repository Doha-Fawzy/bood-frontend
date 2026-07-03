import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, TranslatePipe],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css'
})
export class ServicesSectionComponent implements OnInit {
  services: Service[] = [];

  ngOnInit() {
    this.services = [
      { id: 1, titleEn: 'Hospitality', titleAr: 'الضيافة', descriptionEn: 'Exceptional guest experiences.', descriptionAr: 'تجارب استثنائية للضيوف.', category: 'Hospitality', imageUrl: 'assets/bood-design/images/cat-hospitality.jpeg' },
      { id: 2, titleEn: 'Cleaning', titleAr: 'النظافة', descriptionEn: 'Immaculate spaces that reflect your standards.', descriptionAr: 'مساحات نقية تعكس معاييرك العالية.', category: 'Cleaning', imageUrl: 'assets/bood-design/images/cat-cleaning.jpeg' },
      { id: 3, titleEn: 'Maintenance', titleAr: 'الصيانة', descriptionEn: 'Keeping your facilities safe, functional, always.', descriptionAr: 'الحفاظ على منشآتك آمنة وعاملة دائماً.', category: 'Maintenance', imageUrl: 'assets/bood-design/images/cat-maintenance.jpeg' },
      { id: 4, titleEn: 'Landscaping', titleAr: 'تنسيق الحدائق', descriptionEn: 'Beautiful outdoor spaces, naturally cared for.', descriptionAr: 'مساحات خارجية جميلة بعناية طبيعية.', category: 'Landscaping', imageUrl: 'assets/bood-design/images/expertise-bg.png' },
      { id: 5, titleEn: 'Support Services', titleAr: 'خدمات الدعم', descriptionEn: 'Back-of-house support that makes a difference.', descriptionAr: 'دعم تشغيلي خلف الكواليس يصنع الفارق.', category: 'Support', imageUrl: 'assets/bood-design/images/cat-support.jpeg' }
    ];
  }
}
