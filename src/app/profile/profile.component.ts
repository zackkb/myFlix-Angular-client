import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  movies: any[] = [];
  favoriteMoviesId: any[] = [];
  favoriteMovies: any[] = [];

  // Display inputs to edit profile
  isDisplayedUsernameEdit = false;
  isDisplayedEmailEdit = false;
  isDisplayedPasswordEdit = false;
  isDisplayedBirthdayEdit = false;

  // Hide password input
  hide = true;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
 * Get user data using API, store locally, and populate favoriteMoviesId
 * @return {object} user data
 * @function getUserData
 */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  /**
 * Toggle display of input to edit the username
 */
  displayUsernamerEdit() {
    this.isDisplayedUsernameEdit = !this.isDisplayedUsernameEdit;
  }
  /**
 * Toggle display of input to edit the email of the user
 */
  displayEmailEdit() {
    this.isDisplayedEmailEdit = !this.isDisplayedEmailEdit;
  }
  /**
   * Toggle display of input to edit the password of the user
   */
  displayPasswordEdit() {
    this.isDisplayedPasswordEdit = !this.isDisplayedPasswordEdit;
  }
  /**
  * Toggle display of input to edit the birthday of the user
  */
  displayBirthdayEdit() {
    this.isDisplayedBirthdayEdit = !this.isDisplayedBirthdayEdit;
  }

  /**
 * Update local username and call updateUserData() to update username via the API
 * @function updateUsername
 */
  updateUsername(): void {
    this.user.Username = this.userData.Username;
    this.updateUserData();
    // Set localStorage name to new username
    localStorage.setItem('name', this.user.Username);
    this.displayUsernamerEdit();
  }
  /**
 * Update local email and call updateUserData() to update email via the API
 * @function updateUsername
 */
  updateEmail(): void {
    this.user.Email = this.userData.Email;
    this.updateUserData();
    this.displayEmailEdit();
  }
  /**
   * Update local password and call updateUserData() to update password via the API
   * @function updatePassword
   */
  updatePassword(): void {
    this.user.Password = this.userData.Password;
    this.updateUserData();
    this.displayPasswordEdit();
  }
  /**
   * Update local birthday and call updateUserData() to update birthday via the API
   * @function updatePassword
   */
  updateBirthday(): void {
    this.user.Birthday = this.userData.Birthday;
    this.updateUserData();
    this.displayBirthdayEdit();
  }

  /**
 * Update user data using API and inform user with snackbar
 * @return {object} user data
 * @function updateUserData
 */
  updateUserData(): void {
    this.fetchApiData.updateUser(this.user).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open('User data successfully updated!', 'OK', {
        duration: 2000,
      });
      return resp;
    });
  }

  /**
   * Let user confirm deletion of user account then call deleteProfile()
   * @function onClickDelete
   */
  onClickDelete() {
    if (
      confirm(
        `Are you sure you want to delete your account, ${this.user.Username}?`
      )
    ) {
      this.deleteProfile();
    }
  }

  /**
 * Delete user data using API, clear localStorage, inform user with snackbar, and navigate to "/"
 * @function getUserData
 */
  deleteProfile(): void {
    this.fetchApiData.deleteUser().subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open('Account deleted!', 'OK', {
        duration: 2000,
      });
    });
    localStorage.clear();
    this.router.navigate(['/']);
  }

  /**
 * Get movie data using API, store locally, and call filterMovies()
 * @return {object} movie data
 * @function getUserData
 */
  getMovieDataForFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterMovies();
      return this.movies;
    });
  }

  /**
   * Filter movies so that favoriteMovies only include data of the user's favorite movies
   * @function filterMovies
   */
  filterMovies() {
    const favMovId = this.favoriteMoviesId.map((movie) => movie._id);
    this.favoriteMovies = this.movies.filter((movie) => {
      return favMovId.includes(movie._id);
    });
  }

  /**
 * Remove movie from user"s favorite movies using API, inform user with snackbar, and refresh page
 * @function removeFromFavoriteMovies
 */
  removeFromFavoriteMovies(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((resp: any) => {
      this.snackBar.open('Movie removed from favorites!', 'OK', {
        duration: 2000,
        panelClass: 'snackbar',
      });
      window.location.reload();
    });
  }

  /**
 * Opens dialog of DirectorComponent
 * @param name
 * @param bio
 * @param birth
 * @param death
 * @function openDirectorDialog
 */
  openDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string
  ): void {
    this.dialog.open(DirectorComponent, {
      data: { Name: name, Bio: bio, Birth: birth, Death: death },
      width: '500px',
    });
  }

  /**
   * Opens dialog of GenreComponent
   * @param name
   * @param description
   * @function openGenreDialog
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { Name: name, Description: description },
      width: '500px',
    });
  }

  /**
   * Opens dialog of SynopsisComponent
   * @param synopsis
   * @function openSynopsisDialog
   */
  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { Synopsis: synopsis },
      width: '500px',
    });
  }
}