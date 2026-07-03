import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './services-menu.component.html',
  styleUrl: './services-menu.component.css'
})
export class ServicesMenuComponent {
  categories = [
    { name: 'SERVICES_PAGE.CATEGORIES.HOSPITALITY.TITLE', path: 'hospitality', description: 'SERVICES_PAGE.CATEGORIES.HOSPITALITY.DESC', image: 'assets/bood-design/images/cat-hospitality.jpeg' },
    { name: 'SERVICES_PAGE.CATEGORIES.CLEANING.TITLE', path: 'cleaning', description: 'SERVICES_PAGE.CATEGORIES.CLEANING.DESC', image: 'assets/bood-design/images/cat-cleaning.jpeg' },
    { name: 'SERVICES_PAGE.CATEGORIES.MAINTENANCE.TITLE', path: 'maintenance', description: 'SERVICES_PAGE.CATEGORIES.MAINTENANCE.DESC', image: 'assets/bood-design/images/cat-maintenance.jpeg' },
    { name: 'SERVICES_PAGE.CATEGORIES.LANDSCAPING.TITLE', path: 'landscaping', description: 'SERVICES_PAGE.CATEGORIES.LANDSCAPING.DESC', image: 'assets/bood-design/images/expertise-bg.png' },
    { name: 'SERVICES_PAGE.CATEGORIES.SUPPORT.TITLE', path: 'supportservices', description: 'SERVICES_PAGE.CATEGORIES.SUPPORT.DESC', image: 'assets/bood-design/images/cat-support.jpeg' }
  ];
}
