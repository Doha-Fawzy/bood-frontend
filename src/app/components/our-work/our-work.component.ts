import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-our-work',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './our-work.component.html',
  styleUrl: './our-work.component.css'
})
export class OurWorkComponent {

}
