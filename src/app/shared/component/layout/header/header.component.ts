import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'layout-header',
  standalone: true,
  imports: [RouterLink, NzImageModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
