import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// Use to close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Use to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  loading = false;

  // Hide password input
  hide = true;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  // Function responsible for sending the form inputs to the backend
  loginUser(): void {
    // Spinner
    this.loading = true;
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem('name', result.user.Username);
        localStorage.setItem('token', result.token);
        // Close modal on success
        this.dialogRef.close();
        this.snackBar.open('User login successful!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}