import { Component, input, output, signal } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-modal',
  imports: [],
  template: `
    @if (isOpen()) {
      <!-- Backdrop with Blur -->
      <div 
        class="fixed inset-0 bg-white/30 backdrop-blur-md z-40 transition-all duration-300"
        (click)="close.emit()"
      ></div>
      
      <!-- Modal -->
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div 
          class="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full my-8 animate-modal-in"
          (click)="$event.stopPropagation()"
        >
          <!-- Close Button -->
          <button 
            (click)="close.emit()"
            class="absolute top-6 right-6 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2.5 transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="grid md:grid-cols-2 gap-0 max-h-[85vh] overflow-y-auto">
            <!-- Left Side - Product Image -->
            <div class="flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-8 md:p-12">
              <img 
                [src]="product()?.image" 
                [alt]="product()?.name"
                class="w-full h-auto max-h-[70vh] object-contain drop-shadow-2xl"
              />
            </div>

            <!-- Right Side - Product Details -->
            <div class="flex flex-col space-y-5 p-8 md:p-10">
              <!-- Category Badge -->
              <span class="inline-block text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">
                {{ product()?.category }}
              </span>

              <!-- Product Name -->
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {{ product()?.name }}
              </h2>

              <!-- Price -->
              <div class="flex items-baseline gap-3 pb-2 border-b border-gray-200">
                <span class="text-4xl font-bold text-gray-900">\${{ product()?.price }}</span>
                <span class="text-xl text-gray-400 line-through">\${{ ((product()?.price ?? 0) * 1.3).toFixed(2) }}</span>
                <span class="ml-2 text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">Save 23%</span>
              </div>

              <!-- Rating -->
              <div class="flex items-center gap-2">
                <div class="flex text-yellow-400">
                  @for (star of [1,2,3,4,5]; track star) {
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  }
                </div>
                <span class="text-sm font-medium text-gray-700">4.8</span>
                <span class="text-sm text-gray-500">(247 reviews)</span>
              </div>

              <!-- Description -->
              <div class="py-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p class="text-gray-600 leading-relaxed text-sm">
                  {{ product()?.description }}
                </p>
              </div>

              <!-- Size Selection -->
              <div class="border-t border-gray-200 pt-5">
                <h3 class="text-base font-semibold text-gray-900 mb-3">Select Size</h3>
                <div class="flex flex-wrap gap-2.5">
                  @for (size of sizes; track size) {
                    <button
                      (click)="selectedSize.set(size)"
                      [class]="selectedSize() === size 
                        ? 'bg-blue-600 text-white border-blue-600 scale-105' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'"
                      class="min-w-[60px] px-5 py-2.5 border-2 rounded-lg font-semibold transition-all text-sm"
                    >
                      {{ size }}
                    </button>
                  }
                </div>
              </div>

              <!-- Size Chart -->
              <details class="bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-4 cursor-pointer">
                <summary class="font-semibold text-gray-900 text-sm cursor-pointer select-none">📏 View Size Chart</summary>
                <div class="grid grid-cols-3 gap-2 text-xs mt-3">
                  <div class="font-semibold text-gray-700 pb-2 border-b">Size</div>
                  <div class="font-semibold text-gray-700 pb-2 border-b">Chest</div>
                  <div class="font-semibold text-gray-700 pb-2 border-b">Length</div>
                  
                  <div class="text-gray-600 py-1">S</div>
                  <div class="text-gray-600 py-1">36-38"</div>
                  <div class="text-gray-600 py-1">28"</div>
                  
                  <div class="text-gray-600 py-1">M</div>
                  <div class="text-gray-600 py-1">38-40"</div>
                  <div class="text-gray-600 py-1">29"</div>
                  
                  <div class="text-gray-600 py-1">L</div>
                  <div class="text-gray-600 py-1">40-42"</div>
                  <div class="text-gray-600 py-1">30"</div>
                  
                  <div class="text-gray-600 py-1">XL</div>
                  <div class="text-gray-600 py-1">42-44"</div>
                  <div class="text-gray-600 py-1">31"</div>
                  
                  <div class="text-gray-600 py-1">XXL</div>
                  <div class="text-gray-600 py-1">44-46"</div>
                  <div class="text-gray-600 py-1">32"</div>
                </div>
              </details>

              <!-- Quantity -->
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold text-gray-900">Quantity</h3>
                <div class="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                  <button 
                    (click)="decreaseQuantity()"
                    class="bg-white hover:bg-gray-50 text-gray-800 font-bold w-9 h-9 rounded-md transition-all active:scale-95 shadow-sm"
                  >
                    −
                  </button>
                  <span class="text-lg font-semibold w-10 text-center">{{ quantity() }}</span>
                  <button 
                    (click)="increaseQuantity()"
                    class="bg-white hover:bg-gray-50 text-gray-800 font-bold w-9 h-9 rounded-md transition-all active:scale-95 shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button 
                  (click)="handleAddToCart()"
                  class="flex-1 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3.5 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
                <button 
                  (click)="handleBuyNow()"
                  class="flex-1 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3.5 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Buy Now
                </button>
              </div>

              <!-- Additional Info -->
              <div class="grid grid-cols-2 gap-3 pb-2">
                <div class="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="font-semibold">Free Shipping</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span class="font-semibold">30 Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    @keyframes modalIn {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .animate-modal-in {
      animation: modalIn 0.3s ease-out;
    }
  `,
})
export class ProductModal {
  product = input<Product | null>(null);
  isOpen = input<boolean>(false);
  close = output<void>();
  addToCart = output<{ product: Product; size: string; quantity: number }>();
  buyNow = output<{ product: Product; size: string; quantity: number }>();

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  selectedSize = signal<string>('M');
  quantity = signal<number>(1);

  increaseQuantity() {
    this.quantity.update(q => q + 1);
  }

  decreaseQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  handleAddToCart() {
    const prod = this.product();
    if (prod && this.selectedSize()) {
      this.addToCart.emit({
        product: prod,
        size: this.selectedSize(),
        quantity: this.quantity()
      });
      this.close.emit();
    }
  }

  handleBuyNow() {
    const prod = this.product();
    if (prod && this.selectedSize()) {
      this.buyNow.emit({
        product: prod,
        size: this.selectedSize(),
        quantity: this.quantity()
      });
    }
  }
}
