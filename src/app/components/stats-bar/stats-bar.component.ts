import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-stats-bar',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './stats-bar.component.html',
  styleUrl: './stats-bar.component.css'
})
export class StatsBarComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('statNumber') statElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;
  private intervalId: any = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.startAnimation();
          
          // Repeat the animation every 8 seconds
          this.intervalId = setInterval(() => {
            this.startAnimation();
          }, 8000);
        } else if (!entry.isIntersecting && this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
          this.hasAnimated = false;
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private startAnimation(): void {
    this.statElements.forEach(statRef => {
      const el = statRef.nativeElement;
      const target = +el.getAttribute('data-target');
      const duration = 2000; 
      let startTimestamp: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutQuart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        
        const currentCount = Math.round(easeOut * target);
        el.innerText = currentCount;
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.innerText = target;
        }
      };
      
      window.requestAnimationFrame(step);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
