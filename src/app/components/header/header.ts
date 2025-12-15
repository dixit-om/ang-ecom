import { Component ,signal} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <p class="text-3xl font-bold underline text-red-500">
      {{ title()}}
    </p>
  `,
  styles: ``,
})
export class Header {
   title = signal("These is my ecom app :)");
}
