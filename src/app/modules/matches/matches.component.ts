import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IMatch, IMatchDetail } from '@shared/models';
import { Observable } from 'rxjs';
import { MatcheService } from '@shared/services/matches.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'c-matches',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css',
})
export class MatchesComponent implements OnInit {
  matches$!: Observable<IMatch[]>;
  @Output() onClickMatch = new EventEmitter<IMatchDetail>();

  constructor(private _matchService: MatcheService) {}

  ngOnInit(): void {
    this.matches$ = this._matchService.getMatches();
  }

  onClick(match: IMatchDetail): void {
    this.onClickMatch.emit(match);
  }
}
