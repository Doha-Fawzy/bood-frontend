import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent {
  certificates = [
    'assets/bood-design/images/certificates/cert-1.png',
    'assets/bood-design/images/certificates/cert-2.png',
    'assets/bood-design/images/certificates/cert-3.png',
    'assets/bood-design/images/certificates/cert-4.png'
  ];

}
