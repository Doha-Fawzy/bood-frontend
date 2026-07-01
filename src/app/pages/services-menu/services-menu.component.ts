import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services-menu.component.html',
  styleUrl: './services-menu.component.css'
})
export class ServicesMenuComponent {
  categories = [
    { name: 'Hospitality', path: 'hospitality', description: 'Comprehensive management for 5-star properties ensuring every touchpoint reflects excellence and luxury.' },
    { name: 'Cleaning', path: 'cleaning', description: 'Intensive sanitation and premium cleaning solutions to maintain pristine environments for your staff and clients.' },
    { name: 'Maintenance', path: 'maintenance', description: 'Scheduled preventative maintenance and rapid response to ensure uninterrupted operations.' },
    { name: 'Landscaping', path: 'landscaping', description: 'Designing, beautifying, and meticulously maintaining outdoor environments and green spaces.' },
    { name: 'Support Services', path: 'supportservices', description: 'Essential administrative and operational support working as a seamless extension of your team.' }
  ];
}
