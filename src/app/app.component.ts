import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userInfo: any;
  userRepo: any;

  constructor(private apiService: ApiService) { }

  getUserData(username: string) {
    this.apiService.getUser(username).subscribe(
      (userData: any) => {
        this.userInfo = userData;
        console.log(userData)

        if (this.userInfo.repos_url) {
          this.apiService.getRepositories(this.userInfo.repos_url).subscribe(
            (repos: any) => {
              this.userRepo = repos;
              console.log(repos)
            },
            (error) => {
              console.log('Error fetching repositories', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}