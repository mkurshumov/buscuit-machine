import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-motor',
  templateUrl: './motor.component.html',
  styleUrls: ['./motor.component.scss'],
})
export class MotorComponent implements OnInit {
  public isOn = false;

  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  public toggle() {
    this.isOn = !this.isOn;
    this.store.setMotorState(this.isOn);
  }
}
