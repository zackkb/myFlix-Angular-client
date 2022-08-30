import { Component, OnInit, Input } from '@angular/core';

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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  // Function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Close modal on success
        this.dialogRef.close();
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}