import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})

export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user = [];

  loading = false;
  // Hide password input
  hide = true;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void { }

  /**
   * Register user
   * @function registerUser
   */
  registerUser(): void {
    this.loading = true;
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // Close modal on success
        this.dialogRef.close();
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000,
          panelClass: 'snackbar',
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
          panelClass: 'snackbar',
        });
      }
    );
  }
}