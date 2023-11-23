import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LevelSolverModule } from './modules/level-solver/level-solver.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, LevelSolverModule, HttpClientModule, AngularSvgIconModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
