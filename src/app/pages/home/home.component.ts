import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesSectionComponent } from '../../components/services-section/services-section.component';
import { StatsBarComponent } from '../../components/stats-bar/stats-bar.component';
import { SectorsSectionComponent } from '../../components/sectors-section/sectors-section.component';
import { OurWorkComponent } from '../../components/our-work/our-work.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ServicesSectionComponent, StatsBarComponent, SectorsSectionComponent, OurWorkComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
