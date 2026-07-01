import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../models/service.model';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ServiceCardComponent],
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
          console.error('Error fetching services', err);
          this.error = 'Could not load services for this category from the server.';
          this.isLoading = false;
        }
      });
  }
}
