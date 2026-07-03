import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, TranslatePipe, TranslateDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent { }
