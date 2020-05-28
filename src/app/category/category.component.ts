import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../services/categories.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../models/Category.model';
import {CategoryPage} from '../models/CategoryPage.model';
import {Product} from '../models/Product.model';
import {ProductsService} from '../services/products.service';
import {Images} from '../models/Images.model';
import {Ratings} from "../models/Ratings.model";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Host from '../Host';
import * as md from 'markdown-it';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public name: string;
  public text: string;
  public product: Product;
  public productArray: Product[];
  public ratingOfProduct: number[];
  public ratingsArray: number[];
  public sum: number;
  public ratingsNumber: Ratings[];
  public ratings: Ratings[];
  public page = 0;
  public pagesNmb: number;
  public categoryId: number;

  constructor(private http: HttpClient, private category: CategoriesService, private activatedRoute: ActivatedRoute, private products: ProductsService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(i => {
      this.category.getCategory(i.id).subscribe((data: CategoryPage) => {
        console.log(data);
        this.name = data.category.name;
        this.categoryId = data.category.id;
        this.text = data.category.description;
        this.productArray = data.products;
        this.pagesNmb = data.pagesCount + 1;
        const result = md().renderInline(this.text);
        this.text = result;
      });
    });
  }

  get pageCount(): Array<number> {
    console.log(Array.from(new Array(this.pagesNmb).keys()));
    return Array.from(new Array(this.pagesNmb).keys());
  }
  loadPage(id: number, page: number) {
      this.category.getProductPage(id, page).subscribe(
          (data: CategoryPage) => {
            console.log(data);
            this.productArray = data.products;

          }, (error) => {

          }
        );
      console.log(page);
  }

  getProduct(id: number) {
    this.router.navigate(['/product'], {queryParams: {id}});
  }

}
