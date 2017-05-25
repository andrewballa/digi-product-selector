import { ProductAttribute } from './product-attribute';

export class Answer {
    Id: number;
    AnswerText: string;
    PropertyDescription:string;
    QuestionId: number;
    ParentQuestionId: number;
    Products: number[];

    constructor(){
        this.Products = [];
    }
}