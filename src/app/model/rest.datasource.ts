import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from './product.model';
import { Order } from './order.model';
import { HttpHeaders } from '@angular/common/http';

const PROTOCOL = 'http';
const PORT = 9090;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token?: string;

  constructor(private http: HttpClient) {
    //this.baseUrl = `${PROTOCOL}://localhost:${PORT}/api`;
    this.baseUrl = 'http://35.184.179.124:30163/api';
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + '/orders', order);
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    if (user == 'admin' && pass == 'secret') {
      return new Observable((subscriber) => {
        this.auth_token = 'webtoken';
        subscriber.next(true);
      });
    } else {
      return new Observable((subscriber) => {
        this.auth_token = undefined;
        subscriber.next(false);
      });
    }
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      this.baseUrl + '/products',
      product,
      this.getOptions()
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.baseUrl}/products/${product.productId}`,
      product,
      this.getOptions()
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(
      `${this.baseUrl}/products/${id}`,
      this.getOptions()
    );
  }
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + '/orders', this.getOptions());
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(
      `${this.baseUrl}/orders/${id}`,
      this.getOptions()
    );
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(
      `${this.baseUrl}/orders/${order.orderId}`,
      order,
      this.getOptions()
    );
  }
  private getOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer<${this.auth_token}>`,
      }),
    };
  }
}
