import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule,RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
