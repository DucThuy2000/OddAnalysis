import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'shared-not-found-data',
  standalone: true,
  templateUrl: './not-found-data.component.html',
  styleUrl: './not-found-data.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundDataComponent {
  @Input() message: string = 'No matches found';
  constructor() {}
}
