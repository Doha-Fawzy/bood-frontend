import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent {
  certificates: string[] = [
    environment.apiUrl + '/uploads/certificates/cert-1.png',
    environment.apiUrl + '/uploads/certificates/cert-2.png',
    environment.apiUrl + '/uploads/certificates/cert-3.png',
    environment.apiUrl + '/uploads/certificates/cert-4.png'
  ];

}
