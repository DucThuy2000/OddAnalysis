import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { IStatistic } from '@shared/models';

@Component({
  selector: 'shared-statistic-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatExpansionModule,
    MatIcon,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './statistic-dialog.component.html',
  styleUrl: './statistic-dialog.component.css',
})
export class StatisticDialogComponent {
  constructor(
    private dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public stats: IStatistic
  ) {}

  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
