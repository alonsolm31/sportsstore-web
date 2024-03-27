import { Injectable } from '@angular/core';
import { Product } from './product.model';
@Injectable()
export class Cart {
  public cartLine: CartLine[] = [];
  public itemCount: number = 0;
  public cartPrice: number = 0;
  addLine(product: Product, quantity: number = 1) {
    let line = this.cartLine.find(
      (line) => line.product.productId == product.productId
    );
    if (line != undefined) {
      line.quantity += quantity;
    } else {
      this.cartLine.push(new CartLine(product, quantity));
    }
    this.recalculate();
  }
  updateQuantity(product: Product, quantity: number) {
    let line = this.cartLine.find(
      (line) => line.product.productId == product.productId
    );
    if (line != undefined) {
      line.quantity = Number(quantity);
    }
    this.recalculate();
  }
  removeLine(id: number) {
    let index = this.cartLine.findIndex((line) => line.product.productId == id);
    this.cartLine.splice(index, 1);
    this.recalculate();
  }
  clear() {
    this.cartLine = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }
  private recalculate() {
    this.itemCount = 0;
    this.cartPrice = 0;
    this.cartLine.forEach((l) => {
      this.itemCount += l.quantity;
      this.cartPrice += l.lineTotal;
    });
  }
}
export class CartLine {
  constructor(public product: Product, public quantity: number) {}
  get lineTotal() {
    return this.quantity * (this.product.price ?? 0);
  }
}
