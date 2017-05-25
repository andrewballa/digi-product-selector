import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { SelectorApiService } from '../selector-api.service'
import { SelectedProducts } from '../selected-products';
import { Product } from '../product';
import { Answer } from '../answer';
import * as _ from "lodash";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, DoCheck {

  allProducts: Product[];
  selectedProdSorted: Product[];

  @Input() selectedProducts: SelectedProducts[] = [];
  @Input() allAnswers: Answer[] = [];

  constructor(private selectorApi: SelectorApiService) { }

  ngOnInit() {
    this.getProducts();
  }

  ngDoCheck() {
    if (this.selectedProducts != null) {
      this.processSelectedProducts();
    }
  }


  getProducts(): void {
    this.selectorApi.getProducts().then(a => this.allProducts = a);
  }

  processSelectedProducts(): void {

    var that = this;

    //Get all selected product Id's into an array
    var selectedProdIds = []; //clear the array
    this.selectedProducts.forEach(function (sp, i) {
      sp.Products.forEach(function (pId) {
        selectedProdIds.push(pId);
      })
    })

    //use lodash's _.countBy function to create an object which contains key/value pairs of product and 
    //the number of times the product appears in the array
    var selectedProdCounts = _.countBy(selectedProdIds);

    // Create an array of selected products
    this.selectedProdSorted = Object.keys(selectedProdCounts).map(function (key) {
      var thisProd = that.allProducts.find(x => x.Id.toString() == key);
      var prod = new Product();
      prod.Id = +key;
      prod.ModelSku = thisProd.ModelSku;
      prod["Count"] = selectedProdCounts[key];
      that.selectedProducts.forEach(function (sp) {
        sp.Products.forEach(function (pId) {
          if (pId == prod.Id) {
            prod["Answers"].push(sp.AnswerId);
          }
        })
      })
      return prod;
    });

    this.selectedProdSorted = _.sortBy(this.selectedProdSorted, x => x["Count"]).reverse();

  }

  answerChecked(answers:number[],answerId:number):boolean{
    return answers.some(x=> x==answerId);
  }



}
