import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { ServicesMenuComponent } from './pages/services-menu/services-menu.component';
import { WhyUsComponent } from './pages/why-us/why-us.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesMenuComponent },
  { path: 'services/:categoryName', component: ServiceDetailComponent },
  { path: 'why-us', component: WhyUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', redirectTo: 'why-us' },
  { path: '**', redirectTo: '' }
];
