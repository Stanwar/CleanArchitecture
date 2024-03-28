import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorDateControlComponent } from './mirror-date-control.component';

describe('MirrorDateControlComponent', () => {
  let component: MirrorDateControlComponent;
  let fixture: ComponentFixture<MirrorDateControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MirrorDateControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MirrorDateControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
