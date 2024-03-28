import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsnCntrolComponent } from './ssn-control.component';

describe('SsnCntrolComponent', () => {
  let component: SsnCntrolComponent;
  let fixture: ComponentFixture<SsnCntrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsnCntrolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SsnCntrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
