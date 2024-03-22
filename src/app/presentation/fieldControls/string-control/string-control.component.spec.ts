import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringControlComponent } from './string-control.component';

describe('StringControlComponent', () => {
  let component: StringControlComponent;
  let fixture: ComponentFixture<StringControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StringControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StringControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
