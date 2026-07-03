import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { Service } from '../../../models/service.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-services.component.html',
  styleUrl: './manage-services.component.css'
})
export class ManageServicesComponent implements OnInit {
  services$: Observable<Service[]> | null = null;
  isLoading = true;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.isLoading = true;
    this.services$ = this.serviceService.getServices();
    this.services$.subscribe(() => {
      this.isLoading = false;
    });
  }

  deleteService(id: number) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.serviceService.deleteService(id).subscribe({
        next: () => {
          this.loadServices(); // Reload list after deletion
        },
        error: (err) => {
          console.error('Error deleting service', err);
          alert('Failed to delete service.');
        }
      });
    }
  }

  getFormattedImageUrl(url: string | undefined): string {
    if (!url) return '';
    if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    return url;
  }
}
