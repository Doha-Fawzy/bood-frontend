import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsSectionComponent } from './sectors-section.component';

describe('SectorsSectionComponent', () => {
  let component: SectorsSectionComponent;
  let fixture: ComponentFixture<SectorsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectorsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
