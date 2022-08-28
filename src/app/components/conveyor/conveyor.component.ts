import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { State, StoreService } from 'src/app/store/store.service';
import { SwitchState } from '../switch/switch.component';

@Component({
  selector: 'app-conveyor',
  templateUrl: './conveyor.component.html',
  styleUrls: ['./conveyor.component.scss'],
})
export class ConveyorComponent implements OnInit {
  public steps = [false, false, false, false, false];

  private _stateChangeSub: Subscription | undefined;

  public isConveyorOn = false;
  public tick = 0;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this._stateChangeSub = this.store
      .onStateChange()
      .subscribe((state: State) => {
        this.handleState(state);
      });
  }

  ngOnDestroy(): void {
    if (this._stateChangeSub) this._stateChangeSub.unsubscribe();
  }

  private handleState(state: State) {
    if (
      state.isMotorOn &&
      state.switchState === SwitchState.on &&
      state.ovenState.isOn &&
      state.ovenState.isHeated
    ) {
      this.tick++;
      this.isConveyorOn = true;
      this.incrementConveyor();
    } else if (state.switchState === SwitchState.pause) {
      this.isConveyorOn = false;
    } else {
      this.isConveyorOn = false;
      this.resetSteps();
      this.tick = 0;
      this.index = 0;
    }
  }

  private index = 0;
  private incrementConveyor() {
    // first phase
    if (this.tick < 4) {
      if (this.index > 4) {
        this.index = 0;
      }

      this.resetSteps();

      this.steps[this.index] = true;
      this.index++;
    } else {
      // second phase - repeat
      this.resetSteps();

      this.steps[this.index] = true;
      this.index++;

      if (this.index > 4) {
        this.index = 3;
      }
    }
  }

  private resetSteps() {
    for (let i = 0; i < this.steps.length; i++) {
      this.steps[i] = false;
    }
  }
}
