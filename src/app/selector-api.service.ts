import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { Question } from './question';
import { Answer } from './answer';
import { Product } from './product';
import { ProductAttribute } from './product-attribute';


@Injectable()
export class SelectorApiService {

  // // // Dev
  private questionsUrl = 'http://172.16.1.135/selectortoolapi/selectortool/getdata/getquestions';
  private answersUrl = 'http://172.16.1.135/selectortoolapi/selectortool/getdata/getanswers';
  private productsUrl = 'http://172.16.1.135/selectortoolapi/selectortool/getdata/getproducts';
  private prodAttrUrl = 'http://172.16.1.135/selectortoolapi/selectortool/getdata/getproductattributes'; 

  // // // Prod
  // private questionsUrl = 'selectortoolapi/selectortool/getdata/getquestions';
  // private answersUrl = 'selectortoolapi/selectortool/getdata/getanswers';
  // private productsUrl = 'selectortoolapi/selectortool/getdata/getproducts';
  // private prodAttrUrl = 'selectortoolapi/selectortool/getdata/getproductattributes';

  constructor(private http: Http) { }

  //HTTP GET METHODS
  getQuestions(): Promise<Question[]> {
    return this.http.get(this.questionsUrl)
      .toPromise()
      .then(response => response.json().data as Question[])
      .catch(this.handleError);
  }

  getAnswers(): Promise<Answer[]> {
    return this.http.get(this.answersUrl)
      .toPromise()
      .then(response => response.json().data as Answer[])
      .catch(this.handleError);
  }

  getProducts(): Promise<Product[]>{
    return this.http.get(this.productsUrl)
      .toPromise()
      .then(response => response.json().data as Product[])
      .catch(this.handleError);
  }

  getProductAttributes(): Promise<ProductAttribute[]>{
    return this.http.get(this.prodAttrUrl)
      .toPromise()
      .then(response => response.json().data as ProductAttribute[])
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
