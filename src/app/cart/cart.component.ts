import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/Product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public ProductArray = [];
  public cena: number;

  constructor(private activatedRoute: ActivatedRoute, private products: ProductsService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(i => {
      this.products.getProduct(i.id).subscribe((data: Product) => {
        this.ProductArray.push(data);
        console.log(this.ProductArray);
        localStorage.setItem('product', JSON.stringify(this.ProductArray));
        const jsonProduct = localStorage.getItem('product');
        this.ProductArray = JSON.parse(jsonProduct);      

      });
    });
    const jsonProduct2 = localStorage.getItem('product');
    this.ProductArray = JSON.parse(jsonProduct2);
    const result = this.ProductArray.map(data => data.price).reduce((a, b) => a + b, 0);
    this.cena = result;
  }

  getProduct(id: number) {
    this.router.navigate(['/product'], {queryParams: {id}});
  }

  removeCart() {
    this.ProductArray = [];
    this.cena = 0;
    //localStorage.clear();
  }


}
