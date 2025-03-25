import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTeamSummaryComponent } from './pokemon-team-summary.component';

describe('PokemonTeamSummaryComponent', () => {
  let component: PokemonTeamSummaryComponent;
  let fixture: ComponentFixture<PokemonTeamSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonTeamSummaryComponent]
    });
    fixture = TestBed.createComponent(PokemonTeamSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
