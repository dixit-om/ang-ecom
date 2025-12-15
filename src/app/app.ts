import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  imports: [ Header, Home],
  template: `
    <app-header />
    <app-home />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('ang-ecom');
}
