import { Pipe, PipeTransform } from '@angular/core';
import {Answer } from '../answer';

@Pipe({
  name: 'answersForQuestion'
})
export class AnswersForQuestionPipe implements PipeTransform {

  transform(answers: Answer[], questionId: number): any {
    return answers.filter(a => a.QuestionId===questionId);
  }

}
