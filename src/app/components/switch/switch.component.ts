import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent implements OnInit {
  public state = SwitchState.off;
  public switchState = SwitchState;

  constructor(private store: StoreService) {}

  ngOnInit(): void {}

  public start() {
    this.state = SwitchState.on;
    this.store.setSwitchState(this.state);
  }

  public stop() {
    this.state = SwitchState.off;
    this.store.setSwitchState(this.state);
  }

  public pause() {
    this.state = SwitchState.pause;
    this.store.setSwitchState(this.state);
  }
}

export enum SwitchState {
  on = 'on',
  off = 'off',
  pause = 'pause',
}
