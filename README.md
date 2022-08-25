# myFlix Angular Client

## Description

A client-side for a movie app based on server-side REST API and database ([movie_api](https://github.com/zackkb/movie_api)) built with Angular. Users can register and log in, update their personal information and create a list of their favorite movies, as well as view data about the movies.

## Built With

This project was created with [Angular CLI](https://github.com/angular/angular-cli).

## Key Features

- The app displays a welcome view where users will be able to either log in or register an account.
- Once authenticated, the user should see all movies.
- A button that when clicked, takes a user to the synopsis view, where a description about the movie will be displayed.
- A button that when clicked, takes a user to the director view, where details about the director of that particular movie will be displayed.
- A button that when clicked, takes a user to the genre view, where details about that particular genre of the movie will be displayed.

## General Notes

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
