import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../models/service.model';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ServiceCardComponent, TranslatePipe],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css'
})
export class ServiceDetailComponent implements OnInit {
  categoryName: string = '';
  services: Service[] = [];
  isLoading: boolean = true;
  error: string = '';

  private apiUrl = 'http://localhost:5018/api/services';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName') || '';
      this.fetchServices();
    });
  }

  fetchServices() {
    this.isLoading = true;
    this.error = '';
    
    this.http.get<Service[]>(`${this.apiUrl}/category/${this.categoryName}`)
      .subscribe({
        next: (data) => {
          this.services = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.warn('API not reachable. Falling back to mock data.', err);
          
          // Mock data fallback so the user can see the design without the backend running
          this.services = [
            {
              id: 1,
              titleEn: `${this.categoryName} Service 1`,
              titleAr: `خدمة ${this.categoryName} ١`,
              descriptionEn: `Comprehensive ${this.categoryName} solutions tailored for your business needs.`,
              descriptionAr: `حلول ${this.categoryName} شاملة ومخصصة لاحتياجات عملك.`,
              category: this.categoryName,
              imageUrl: 'assets/bood-design/images/bood-service-1.jpg'
            },
            {
              id: 2,
              titleEn: `${this.categoryName} Service 2`,
              titleAr: `خدمة ${this.categoryName} ٢`,
              descriptionEn: `Advanced and intelligent ${this.categoryName} operations to elevate performance.`,
              descriptionAr: `عمليات ${this.categoryName} متطورة وذكية للارتقاء بالأداء.`,
              category: this.categoryName,
              imageUrl: 'assets/bood-design/images/bood-service-2.jpg'
            },
            {
              id: 3,
              titleEn: `${this.categoryName} Service 3`,
              titleAr: `خدمة ${this.categoryName} ٣`,
              descriptionEn: `Expertly managed ${this.categoryName} services with round-the-clock support.`,
              descriptionAr: `خدمات ${this.categoryName} تدار باحترافية مع دعم على مدار الساعة.`,
              category: this.categoryName,
              imageUrl: 'assets/bood-design/images/bood-service-3.jpg'
            }
          ];
          
          this.isLoading = false;
          // Clear error so the grid renders
          this.error = '';
        }
      });
  }

  getCategoryKey(categoryName: string): string {
    if (!categoryName) return '';
    const normalized = categoryName.toLowerCase().replace(/\s+/g, '');
    if (normalized === 'supportservices' || normalized === 'support') {
      return 'SUPPORT';
    }
    return normalized.toUpperCase();
  }
}
