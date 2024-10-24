import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'shared-error-message',
  template: `
    @if (message) {
    <span class="text-sm text-red-400">{{ message }}</span>
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessage {
  @Input() message: string = '';
}
