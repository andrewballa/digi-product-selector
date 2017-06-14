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

  selectedProdSorted: Product[] = [];

  @Input() selectedProducts: SelectedProducts[] = [];
  @Input() allAnswers: Answer[] = [];
  @Input() allProducts: Product[] = [];


  constructor(private selectorApi: SelectorApiService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.selectedProducts != null) {
      this.processSelectedProducts();
    }
    else {
      this.selectedProdSorted = [];
    }
  }


  getProducts(): void {
    this.selectorApi.getProducts().then(a => this.allProducts = a);
  }

  processSelectedProducts(): void {
    var that = this;

    //Get all selected product Id's into an array
    var selectedProdIds: number[] = []; //clear the array
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
      var thisProd = that.allProducts.find(p => p.Id.toString() == key);
      var prod = new Product();
      prod.Id = +key; //+ is TypeScript syntax to convert a string to an integer
      prod["ModelSku"] = thisProd["ModelSku"];
      that.selectedProducts.forEach(function (sp) {
        sp.Products.forEach(function (pId) {
          if (pId == prod.Id) {
            prod["Answers"].push(sp.AnswerId);
          }
        })
      })
      return prod;
    });

    //sort the products by how many answers apply to it. 
    this.selectedProdSorted = _.sortBy(this.selectedProdSorted, p => p["Answers"].length).reverse();

  }

  answerChecked(pId: number, answerId: number): boolean {
    return this.selectedProdSorted.find(x => x.Id == pId)["Answers"].some(x => x == answerId);
  }

}
