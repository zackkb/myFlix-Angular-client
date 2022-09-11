import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://zachmovie.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  /**
   * POST API call to register the user
   * @param userDetails
   * @returns user data in JSON
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * POST API call to log in the user
   * @param {any} userDetails
   * @returns user data in JSON
   * @function userLogin
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
 * GET API call to get all movies
 * @returns array of all movies in JSON
 * @function getAllMovies
 */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
 * GET API call to get data of a single movie
 * @param {string} title
 * @returns movie data in JSON
 * @function getOneMovie
 */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * GET API call to get data of a genre
   * @param {string} genre
   * @returns data of genre in JSON
   * @function getGenre
   */
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}genres/${genre}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
 * GET API call to get data of a director
 * @param {string} director
 * @returns data of director in JSON
 * @function getDirector
 */
  getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}directors/${director}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * GET API call to get user data
   * @returns user data in JSON
   * @function getUser
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('name');
    return this.http
      .get(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * PUT API call to update user data
   * @param {any} userData
   * @returns user data in JSON
   * @function updateUser
   */
  updateUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('name');
    return this.http
      .put(`${apiUrl}users/${user}`, userData, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * PUT API call to add movie to favorite movies of a user
   * @param {string} movie
   * @returns user data in JSON
   * @function addFavoriteMovie
   */
  addFavoriteMovie(movie: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('name');
    return this.http
      .post(
        `${apiUrl}users/${user}/movies/${movie}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * DELETE API call to remove movie from favorite movies of a user
   * @param {string} movie
   * @returns user data in JSON
   * @function removeFavoriteMovie
   */
  removeFavoriteMovie(movie: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('name');
    return this.http
      .delete(`${apiUrl}users/${user}/movies/${movie}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
 * DELETE API call to delete user
 * @returns message as confirmation
 * @function deleteUser
 */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('name');
    return this.http
      .delete(`${apiUrl}users/${user}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handle error
   * @param error
   * @returns
   * @function handleError
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error Body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}