import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.isFavoriteMovie('62619350230c7b71b50e5804');
  }

  // Get list of movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  // Check if movie is included in favorite movie list of user
  isFavoriteMovie(movieId: string) {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      // Array with ids of favorite movies
      const favoriteMoviesIds = resp.FavoriteMovies.map(
        (movie: any) => movie._id
      );
      return favoriteMoviesIds.includes(movieId);
    });
  }

  // Add movie to favorites
  addToFavoriteMovies(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp: any) => {
      this.snackBar.open('Movie added to favorites!', 'OK', {
        duration: 2000,
        panelClass: 'snackbar',
      });
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