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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMovieDataForFavorites();
    this.getUserData();
  }

  // Get user data
  getUserData(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      // Populate favoriteMovies from user data
      this.favoriteMoviesId = resp.FavoriteMovies;
      return this.user;
    });
  }

  // Display inputs to edit user data
  displayUsernamerEdit() {
    this.isDisplayedUsernameEdit = !this.isDisplayedUsernameEdit;
  }
  displayEmailEdit() {
    this.isDisplayedEmailEdit = !this.isDisplayedEmailEdit;
  }
  displayPasswordEdit() {
    this.isDisplayedPasswordEdit = !this.isDisplayedPasswordEdit;
  }
  displayBirthdayEdit() {
    this.isDisplayedBirthdayEdit = !this.isDisplayedBirthdayEdit;
  }

  // Update user data
  updateUsername(): void {
    this.user.Username = this.userData.Username;
    this.updateUserData();
    // Set localStorage name to new username
    localStorage.setItem('name', this.user.Username);
    this.displayUsernamerEdit();
  }
  updateEmail(): void {
    this.user.Email = this.userData.Email;
    this.updateUserData();
    this.displayEmailEdit();
  }
  updatePassword(): void {
    this.user.Password = this.userData.Password;
    this.updateUserData();
    this.displayPasswordEdit();
  }
  updateBirthday(): void {
    this.user.Birthday = this.userData.Birthday;
    this.updateUserData();
    this.displayBirthdayEdit();
  }

  // Update user data
  updateUserData(): void {
    this.fetchApiData.updateUser(this.user).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open('User data successfully updated!', 'OK', {
        duration: 2000,
      });
      return resp;
    });
  }

  // Confirm deletion before the account is deleted
  onClickDelete() {
    if (
      confirm(
        `Are you sure you want to delete your account, ${this.user.Username}?`
      )
    ) {
      this.deleteProfile();
    }
  }

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

  getMovieDataForFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // Filter the favorite movies of user
      this.filterMovies();
      return this.movies;
    });
  }

  // Match with the movieId of favoriteMovies
  filterMovies() {
    const favMovId = this.favoriteMoviesId.map((movie) => movie._id);
    this.favoriteMovies = this.movies.filter((movie) => {
      return favMovId.includes(movie._id);
    });
  }

  removeFromFavoriteMovies(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((resp: any) => {
      this.snackBar.open('Movie removed from list!', 'OK', {
        duration: 2000,
        panelClass: 'snackbar',
      });
      window.location.reload();
    });
  }

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

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { Name: name, Description: description },
      width: '500px',
    });
  }

  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { Synopsis: synopsis },
      width: '500px',
    });
  }
}