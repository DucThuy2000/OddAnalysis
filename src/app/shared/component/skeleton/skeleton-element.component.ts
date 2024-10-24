import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'home-match-skeleton',
  standalone: true,
  template: `
    <div class="animate-pulse">
      <div
        class="px-5 py-2 border-gray-100 border bg-[#f8f9fa] color-[#1f1f1f]"
      >
        <div class="bg-gray-200 w-36 h-4 rounded-md"></div>
      </div>
      <div class="grid grid-cols-2">
        @for(match of _matches; let idx = $index; track idx) {
        <div
          class="flex items-center justify-between p-6 pr-12 border-[0.5px] border-gray-100 bg-white"
        >
          <div class="flex flex-col gap-2 py-2">
            <div class="flex items-center gap-2">
              <div class="bg-gray-200 h-8 w-8 rounded-full"></div>
              <div class="bg-gray-200 w-20 h-4 rounded-md"></div>
            </div>
            <div class="flex items-center gap-2">
              <div class="bg-gray-200 h-8 w-8 rounded-full"></div>
              <div class="bg-gray-200 w-20 h-4 rounded-md"></div>
            </div>
          </div>
          <div class="bg-gray-200 w-12 h-4 rounded-md"></div>
        </div>
        }
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeMatchSkeleton {
  _matches: number[] = [];
  @Input({ required: true })
  set matchLength(value: number) {
    this._matches = new Array(value).fill(0);
  }

  get matchLength() {
    return this._matches.length;
  }
}

@Component({
  selector: 'leagues-skeleton',
  standalone: true,
  template: `<div class="animate-pulse flex flex-col gap-4 p-4">
    @for(league of _leagues; let idx = $index; track idx) {
    <div class="flex items-center gap-3">
      <div class="bg-gray-200 h-7 w-7 rounded-full"></div>
      <div class="bg-gray-200 w-28 h-4 rounded-md"></div>
    </div>
    }
  </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaguesSkeleton {
  _leagues: number[] = [];
  @Input({ required: true })
  set leagueLength(value: number) {
    this._leagues = new Array(value).fill(0);
  }

  get leagueLength() {
    return this._leagues.length;
  }
}
