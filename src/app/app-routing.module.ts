import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { PokemonTeamComponent } from './pages/pokemon-team/pokemon-team.component';
import { PokemonTeamSummaryComponent } from './pages/pokemon-team-summary/pokemon-team-summary.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'team', component: PokemonTeamComponent },
  { path: 'summary', component: PokemonTeamSummaryComponent },
  { path: '**', redirectTo: 'profile' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
