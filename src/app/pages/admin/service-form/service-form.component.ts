import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { Service } from '../../../models/service.model';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css'
})
export class ServiceFormComponent implements OnInit {
  serviceForm: FormGroup;
  isEditMode = false;
  serviceId: number | null = null;
  isLoading = false;
  isSaving = false;
  showSuccessMessage = false;
  categories = [
    { value: 'Hospitality', label: 'Hospitality' },
    { value: 'Cleaning', label: 'Cleaning' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Landscaping', label: 'Landscaping' },
    { value: 'SupportServices', label: 'Support Services' }
  ];

  isDragging = false;
  isUploading = false;
  uploadError = '';

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.serviceForm = this.fb.group({
      titleEn: ['', Validators.required],
      titleAr: ['', Validators.required],
      descriptionEn: ['', Validators.required],
      descriptionAr: ['', Validators.required],
      imageUrl: ['', Validators.required],
      category: ['Hospitality', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.serviceId = +id;
        this.loadServiceData(this.serviceId);
      }
    });
  }

  loadServiceData(id: number) {
    this.isLoading = true;
    this.serviceService.getServiceById(id).subscribe({
      next: (service) => {
        this.serviceForm.patchValue({
          titleEn: service.titleEn,
          titleAr: service.titleAr,
          descriptionEn: service.descriptionEn,
          descriptionAr: service.descriptionAr,
          imageUrl: service.imageUrl,
          category: service.category
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading service', err);
        alert('Failed to load service data.');
        this.isLoading = false;
        this.router.navigate(['/admin/services']);
      }
    });
  }

  onSubmit() {
    if (this.serviceForm.invalid) {
      return;
    }

    this.isSaving = true;
    const serviceData: Service = {
      ...this.serviceForm.value,
      category: this.serviceForm.value.category
    };

    if (this.isEditMode && this.serviceId) {
      serviceData.id = this.serviceId;
      this.serviceService.updateService(this.serviceId, serviceData).subscribe({
        next: () => {
          this.isSaving = false;
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.router.navigate(['/admin/services']);
          }, 2000);
        },
        error: (err) => {
          console.error('Error updating', err);
          let errMsg = 'Failed to update service.';
          if (err.error && err.error.errors) {
            errMsg += ' ' + JSON.stringify(err.error.errors);
          } else if (err.error) {
            errMsg += ' ' + JSON.stringify(err.error);
          }
          alert(errMsg);
          this.isSaving = false;
        }
      });
    } else {
      this.serviceService.createService(serviceData).subscribe({
        next: () => {
          this.isSaving = false;
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.router.navigate(['/admin/services']);
          }, 2000);
        },
        error: (err) => {
          console.error('Error creating', err);
          let errMsg = 'Failed to create service.';
          if (err.error && err.error.errors) {
            errMsg += ' ' + JSON.stringify(err.error.errors);
          } else if (err.error) {
            errMsg += ' ' + JSON.stringify(err.error);
          }
          alert(errMsg);
          this.isSaving = false;
        }
      });
    }
  }

  // --- Drag and Drop Handlers ---
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFileUpload(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFileUpload(input.files[0]);
    }
  }

  private handleFileUpload(file: File) {
    this.uploadError = '';
    
    // Basic validation
    if (!file.type.startsWith('image/')) {
      this.uploadError = 'Please upload an image file.';
      return;
    }
    
    // Optional size limit (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.uploadError = 'File size exceeds 5MB limit.';
      return;
    }

    this.isUploading = true;
    this.serviceService.uploadImage(file).subscribe({
      next: (response) => {
        // Since backend runs on :5018 and frontend on :4200, we prepend backend URL for preview/saving 
        // to make sure it resolves properly during dev. In production this would just be the relative URL.
        const fullUrl = `http://localhost:5018${response.url}`;
        this.serviceForm.patchValue({ imageUrl: fullUrl });
        this.isUploading = false;
      },
      error: (err) => {
        console.error('Error uploading image', err);
        this.uploadError = 'Failed to upload image. Make sure the API is running.';
        this.isUploading = false;
      }
    });
  }
}
