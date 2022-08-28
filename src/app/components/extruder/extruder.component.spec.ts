import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtruderComponent } from './extruder.component';

describe('ExtruderComponent', () => {
  let component: ExtruderComponent;
  let fixture: ComponentFixture<ExtruderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtruderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtruderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
