import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { ServicesMenuComponent } from './pages/services-menu/services-menu.component';
import { WhyUsComponent } from './pages/why-us/why-us.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ContactComponent } from './pages/contact/contact.component';

import { LoginComponent } from './pages/admin/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ManageServicesComponent } from './pages/admin/manage-services/manage-services.component';
import { ServiceFormComponent } from './pages/admin/service-form/service-form.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesMenuComponent },
  { path: 'services/:categoryName', component: ServiceDetailComponent },
  { path: 'why-us', component: WhyUsComponent },
  { path: 'certificates', component: CertificatesComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', redirectTo: 'why-us' },
  
  // Admin Routes
  { path: 'admin/login', component: LoginComponent },
  { 
    path: 'admin', 
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'services', pathMatch: 'full' },
      { path: 'services', component: ManageServicesComponent },
      { path: 'services/new', component: ServiceFormComponent },
      { path: 'services/edit/:id', component: ServiceFormComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];
