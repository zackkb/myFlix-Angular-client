import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  /**
 * Navigate to ProfileComponent
 * @function profile
 */
  profile() {
    this.router.navigate(['profile']);
  }

  /**
   * Clear localStorage and navigate to "/"
   * @function logout
   */
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}