import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};

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

  // Get user data
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
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
}