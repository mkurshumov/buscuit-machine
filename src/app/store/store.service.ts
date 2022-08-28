import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OvenState, SwitchState } from '../components';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  // default state
  private state: State = {
    isMotorOn: false,
    switchState: SwitchState.off,
    ovenState: { isOn: false, isHeated: false, isOverheated: false },
    isStamperOn: false,
    isExtruderOn: false,
  };

  private state$ = new Subject<State>();

  private switchMotorState$ = new Subject<SwitchMotorState>();

  public onStateChange() {
    return this.state$;
  }

  public setMotorState(isOn: boolean): void {
    this.state.isMotorOn = isOn;
    this.state$.next(this.state);
    this.switchMotorState$.next({
      isMotorOn: this.state.isMotorOn,
      switchState: this.state.switchState,
    });
  }

  public setSwitchState(state: SwitchState): void {
    this.state.switchState = state;
    this.state$.next(this.state);
    this.switchMotorState$.next({
      isMotorOn: this.state.isMotorOn,
      switchState: this.state.switchState,
    });
  }

  public setOvenState(state: OvenState): void {
    this.state.ovenState = state;
    this.state$.next(this.state);
  }

  public onSwitchMotorChange() {
    return this.switchMotorState$;
  }
}

export interface State {
  isMotorOn: boolean;
  switchState: SwitchState;
  ovenState: OvenState;
  isStamperOn: boolean;
  isExtruderOn: boolean;
}

export interface SwitchMotorState {
  isMotorOn: boolean;
  switchState: SwitchState;
}
