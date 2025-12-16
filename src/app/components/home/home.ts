import { Component, signal } from '@angular/core';
import { PRODUCTS } from '../../data/products.data';
import { Product } from '../../models/product';
import { ProductModal } from '../product-modal/product-modal';

@Component({
  selector: 'app-home',
  imports: [ProductModal],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @for (product of products(); track product.id) {
          <div 
            (click)="openModal(product)"
            class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
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
                  (click)="quickAddToCart($event, product)"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  Quick Add
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    <!-- Product Modal -->
    <app-product-modal
      [product]="selectedProduct()"
      [isOpen]="isModalOpen()"
      (close)="closeModal()"
      (addToCart)="handleAddToCart($event)"
      (buyNow)="handleBuyNow($event)"
    />
  `,
  styles: ``,
})
export class Home {
  products = signal<Product[]>(PRODUCTS);
  selectedProduct = signal<Product | null>(null);
  isModalOpen = signal<boolean>(false);

  openModal(product: Product) {
    this.selectedProduct.set(product);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    setTimeout(() => {
      this.selectedProduct.set(null);
    }, 300);
  }

  quickAddToCart(event: Event, product: Product) {
    event.stopPropagation();
    console.log('Quick added to cart:', product);
    // TODO: Add to cart with default size
    alert(`${product.name} added to cart!`);
  }

  handleAddToCart(data: { product: Product; size: string; quantity: number }) {
    console.log('Added to cart:', data);
    alert(`${data.quantity}x ${data.product.name} (Size: ${data.size}) added to cart!`);
  }

  handleBuyNow(data: { product: Product; size: string; quantity: number }) {
    console.log('Buy now:', data);
    alert(`Proceeding to checkout with ${data.quantity}x ${data.product.name} (Size: ${data.size})`);
  }
}
