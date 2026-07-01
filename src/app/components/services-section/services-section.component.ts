import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css'
})
export class ServicesSectionComponent implements OnInit {
  services: Service[] = [];

  ngOnInit() {
    this.services = [
      { id: 1, title: 'Hospitality', description: 'Exceptional guest experiences.', category: 'Hospitality', iconName: 'hospitality' },
      { id: 2, title: 'Cleaning', description: 'Immaculate spaces that reflect your standards.', category: 'Cleaning', iconName: 'cleaning' },
      { id: 3, title: 'Maintenance', description: 'Keeping your facilities safe, functional, always.', category: 'Maintenance', iconName: 'maintenance' },
      { id: 4, title: 'Landscaping', description: 'Beautiful outdoor spaces, naturally cared for.', category: 'Landscaping', iconName: 'landscaping' },
      { id: 5, title: 'Support Services', description: 'Back-of-house support that makes a difference.', category: 'Support', iconName: 'support' }
    ];
  }
}
