import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDropdownControlComponent } from './dynamic-dropdown-control.component';

describe('DynamicDropdownControlComponent', () => {
  let component: DynamicDropdownControlComponent;
  let fixture: ComponentFixture<DynamicDropdownControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicDropdownControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicDropdownControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
