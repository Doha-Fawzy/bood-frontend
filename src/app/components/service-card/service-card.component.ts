import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../models/service.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: Service;

  constructor(public languageService: LanguageService) {}

  get formattedImageUrl(): string {
    if (!this.service?.imageUrl) return '';
    return this.transformGoogleDriveLink(this.service.imageUrl);
  }

  private transformGoogleDriveLink(url: string): string {
    if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    return url;
  }
}
