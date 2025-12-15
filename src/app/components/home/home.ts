import { Component, signal } from '@angular/core';
import { PRODUCTS } from '../../data/products.data';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @for (product of products(); track product.id) {
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="relative h-64 overflow-hidden bg-gray-200">
              <img 
                [src]="product.image" 
                [alt]="product.name"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div class="p-4">
              <span class="text-xs text-blue-600 font-semibold uppercase">{{ product.category }}</span>
              <h3 class="text-lg font-bold text-gray-800 mt-1 mb-2">{{ product.name }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ product.description }}</p>
              
              <div class="flex items-center justify-between">
                <span class="text-2xl font-bold text-gray-900">\${{ product.price }}</span>
                <button 
                  (click)="addToCart(product)"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class Home {
  products = signal<Product[]>(PRODUCTS);

  addToCart(product: Product) {
    console.log('Added to cart:', product);
    // TODO: Implement cart functionality
  }
}
