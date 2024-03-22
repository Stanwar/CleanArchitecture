import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorControlComponent } from './mirror-control.component';

describe('MirrorControlComponent', () => {
  let component: MirrorControlComponent;
  let fixture: ComponentFixture<MirrorControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MirrorControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MirrorControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
