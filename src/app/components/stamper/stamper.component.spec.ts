import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StamperComponent } from './stamper.component';

describe('StamperComponent', () => {
  let component: StamperComponent;
  let fixture: ComponentFixture<StamperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StamperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StamperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
