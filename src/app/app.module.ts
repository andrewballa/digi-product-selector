import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { SelectorApiService } from './selector-api.service';
import { AnswersForQuestionPipe } from './pipes/answers-for-question.pipe';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    AnswersForQuestionPipe,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SelectorApiService],
  bootstrap: [AppComponent, SurveyComponent]
})
export class AppModule { }
