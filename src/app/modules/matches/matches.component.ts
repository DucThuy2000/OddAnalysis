import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ILeague, IMatch, IMatchDetail } from '@shared/models';
import { Observable } from 'rxjs';
import { MatcheService } from '@shared/services/matches.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { LeagueService } from '@shared/services/league.service';
import { NotFoundDataComponent } from '@shared/component/not-found-data/not-found-data.component';

@Component({
  selector: 'c-matches',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    NotFoundDataComponent,
  ],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css',
})
export class MatchesComponent implements OnInit {
  @Output() onClickMatch = new EventEmitter<IMatchDetail>();

  matches$!: Observable<IMatch[]>;
  leagues$!: Observable<ILeague[]>;

  constructor(
    private matchService: MatcheService,
    private leagueService: LeagueService
  ) {}

  ngOnInit(): void {
    if (!this.matches$) console.log('not matches found');
    this.leagues$ = this.leagueService.getLeagues();
  }

  onClick(match: IMatchDetail): void {
    this.onClickMatch.emit(match);
  }

  onChangeLeague(leagueId: string): void {
    this.matches$ = this.matchService.getMatches(leagueId);
  }
}
