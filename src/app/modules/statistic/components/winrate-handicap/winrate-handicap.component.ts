import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'statistic-win-rate-hdc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="bg-white shadow-md rounded-md p-4">
    <span class="font-medium">Handicap win rate</span>s
    <div class="relative w-6 h-6 rounded-full overflow-hidden">
      <div class="absolute inset-0 w-full h-full bg-green-400"></div>
      <div class="absolute inset-0 left-1/2 w-1/2 h-full bg-green-200"></div>
    </div>
  </div>`,
})
export class WinRateHandicap {
  @Input({ required: true })
  private _router = inject(Router);

  ngOnInit() {}
}
