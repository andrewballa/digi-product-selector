import { Component, OnInit, DoCheck } from '@angular/core';
import { Question } from '../question';
import { Answer } from '../answer';
import { ProductAttribute } from '../product-attribute';
import { SelectedProducts } from '../selected-products';
import { SelectorApiService } from '../selector-api.service'
import * as _ from "lodash";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

export class SurveyComponent implements OnInit, DoCheck {

  questions: Question[] = [];
  answers: Answer[] = [];
  allProductAttributes: ProductAttribute[] = [];
  selectedProducts: SelectedProducts[] = [];
  currentQuestion: number = 0;
  numberOfViews: number = 0;
  isResetResults: boolean;
  isQuestionsAvailable: boolean = false;
  isAnswersAvailable: boolean = false;
  isProductAttrsAvailable: boolean = false;

  constructor(private selectorApi: SelectorApiService) { }

  ngOnInit(): void {
    this.getQuestions();
    this.getProductAttributes();
    this.getAnswers();
    this.isResetResults = false;
  }

  ngDoCheck(): void {
    var that = this;
    for (let ans of this.answers) {
      ans["Products"] = this.allProductAttributes.filter(e => e.AnswerId == ans.Id).map(function (pa) { return pa["ProductId"] })
    }
    this.numberOfViews = Math.ceil(this.questions.length / 2);
    this.questions = _.sortBy(this.questions, q => q["QuestionOrder"]);
  }

  getProductAttributes(): void {
    this.selectorApi.getProductAttributes().then(a => this.allProductAttributes = a).then(() => this.isProductAttrsAvailable = true);
  }

  getAnswers(): void {
    this.selectorApi.getAnswers().then(a => this.answers = a).then(() => this.isAnswersAvailable = true);
  }

  getQuestions(): void {
    this.selectorApi.getQuestions().then(q => this.questions = q).then(() => this.isQuestionsAvailable = true);
  }

  answerSelected(ans: Answer): void {
    //remove this question's answer from the list of selected answers
    var index = this.selectedProducts.findIndex(function (sp) { return sp.QuestionId == ans.QuestionId });
    if (index != -1) {
      this.selectedProducts.splice(index, 1)
    }
    //add this question's newly selected answer
    var sp = new SelectedProducts();
    sp.QuestionId = ans.QuestionId;
    sp.AnswerId = ans.Id;
    sp.Products = ans["Products"];
    this.selectedProducts.push(sp);
  }

  getSelectedProducts(): SelectedProducts[] {
    if (this.selectedProducts.length > 3) {
      return this.selectedProducts;
    }
  }

  isSelected(questionId: number, answerId: number) {
    return this.selectedProducts.some(sp => sp.AnswerId == answerId && sp.QuestionId == questionId)
  }

  showPrev(): void {
    if (this.currentQuestion > 0) {
      this.currentQuestion -= 2;
    }
  }

  showNext(): void {
    if (this.currentQuestion <= this.numberOfViews + 2) {
      this.currentQuestion += 2;
    }
  }

  startOverSurvey(): void {
    this.currentQuestion = 0;
    this.selectedProducts = [];
    this.isResetResults = true;
  }




}
