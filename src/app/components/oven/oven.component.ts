import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService, SwitchMotorState } from 'src/app/store/store.service';
import { SwitchState } from '../switch/switch.component';

@Component({
  selector: 'app-oven',
  templateUrl: './oven.component.html',
  styleUrls: ['./oven.component.scss'],
})
export class OvenComponent implements OnInit, OnDestroy {
  public oven: OvenState = {
    isOverheated: false,
    isHeated: false,
    isOn: false,
  };

  private TICK_RATE = 1000; // ms
  private TEMPERATURE_STEP = 20;
  public temperature = 0;
  public upTime = 0;
  public maxUpTime = 60; // seconds

  private startInterval: any;
  private stopInterval: any;

  private _switchAndMotorChangeSub: Subscription | undefined;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this._switchAndMotorChangeSub = this.store
      .onSwitchMotorChange()
      .subscribe((state: SwitchMotorState) => {
        if (!state.isMotorOn || state.switchState === SwitchState.off) {
          this.stop();
        } else if (state.switchState === SwitchState.on) {
          this.start();
        }
      });
  }

  ngOnDestroy(): void {
    if (this._switchAndMotorChangeSub)
      this._switchAndMotorChangeSub.unsubscribe();
  }

  private start() {
    if (this.stopInterval) clearInterval(this.stopInterval);

    if (!this.oven.isOn) {
      this.oven.isOn = true;

      this.startInterval = setInterval(() => {
        if (this.temperature < 200) {
          this.temperature += this.TEMPERATURE_STEP;
        } else {
          this.oven.isHeated = true;
          this.store.setOvenState(this.oven);
        }

        this.checkOverheat();

        this.upTime++;
      }, this.TICK_RATE);
    }
  }

  private stop() {
    if (this.startInterval) clearInterval(this.startInterval);

    if (this.oven.isOn) {
      this.oven.isOn = false;
      this.upTime = 0;

      this.stopInterval = setInterval(() => {
        if (this.temperature > 0) {
          this.temperature -= this.TEMPERATURE_STEP;
        } else {
          this.oven.isHeated = false;
          this.store.setOvenState(this.oven);
        }

        if (this.temperature <= 200) {
          this.oven.isOverheated = false;
          this.store.setOvenState(this.oven);
        }
      }, this.TICK_RATE);
    }
  }

  private checkOverheat() {
    if (this.upTime >= this.maxUpTime && this.temperature < 260) {
      this.temperature += this.TEMPERATURE_STEP;
    }

    if (this.temperature > 240) {
      this.oven.isOverheated = true;
      this.store.setOvenState(this.oven);
    }
  }
}

export interface OvenState {
  isOn: boolean;
  isHeated: boolean;
  isOverheated: boolean;
}
