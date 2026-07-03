import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sectors-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './sectors-section.component.html',
  styleUrl: './sectors-section.component.css'
})
export class SectorsSectionComponent {

}
