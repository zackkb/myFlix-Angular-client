import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  // check if user is logged in
  userLoggedIn(): boolean {
    return localStorage.getItem('name') ? true : false;
  }
}