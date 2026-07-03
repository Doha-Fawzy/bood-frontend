import { Component, ElementRef, ViewChildren, ViewChild, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.css'
})
export class WhyUsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('numbersSection') numbersSection!: ElementRef;
  @ViewChildren('counter') counters!: QueryList<ElementRef>;

  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;
  private intervalId: any = null;

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
          // Optional: Pause animation if out of view to save performance
          clearInterval(this.intervalId);
          this.intervalId = null;
          this.hasAnimated = false; // Reset so it runs immediately when scrolling back
        }
      });
    }, options);

    if (this.numbersSection) {
      this.observer.observe(this.numbersSection.nativeElement);
    }
  }

  private startAnimation(): void {
    this.counters.forEach(counterRef => {
      const el = counterRef.nativeElement;
      const target = +el.getAttribute('data-target');
      const duration = 2000; // 2 seconds animation
      let startTimestamp: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutQuart easing function for smooth deceleration
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
