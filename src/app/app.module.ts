import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './pages/profile/profile.component';
import { PokemonTeamComponent } from './pages/pokemon-team/pokemon-team.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';

// angular material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './shared/components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_DATE_FORMAT } from './shared/utils';
import { FormatDuiPipe } from './core/pipes/format-dui.pipe';
import { TeamSelectComponent } from './components/team-select/team-select.component';
import { HttpClientModule } from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { PokemonTeamSummaryComponent } from './pages/pokemon-team-summary/pokemon-team-summary.component';
import { TeamSummaryComponent } from './components/team-summary/team-summary.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { LoadingOverlayComponent } from './shared/loading-overlay/loading-overlay.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    PokemonTeamComponent,
    HeaderComponent,
    ProfileCardComponent,
    ProfileFormComponent,
    FormatDuiPipe,
    TeamSelectComponent,
    PokemonTeamSummaryComponent,
    TeamSummaryComponent,
    LoadingOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule,
    NgxMaskDirective,
    HttpClientModule,
    ScrollingModule,
    MatProgressBarModule,
    MatMenuModule
  ],
  exports: [FormatDuiPipe],
  providers: [provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
