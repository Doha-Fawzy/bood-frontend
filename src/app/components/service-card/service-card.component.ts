import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../models/service.model';
import { LanguageService } from '../../services/language.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: Service;
  environment = environment;

  constructor(public languageService: LanguageService) {}

  get formattedImageUrl(): string {
    if (!this.service?.imageUrl) return '';
    let url = this.transformGoogleDriveLink(this.service.imageUrl);

    // 1. Remove legacy hardcoded localhost (e.g. http://localhost:5018)
    if (url.includes('http://localhost:')) {
      url = url.replace(/http:\/\/localhost:\d+/g, '');
    }

    // 2. Leave absolute external URLs intact
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    // 3. Prepend backend environment URL to relative paths
    if (url.startsWith('/')) {
      return environment.apiUrl + url;
    }

    return url;
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
