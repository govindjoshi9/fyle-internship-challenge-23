import { Component, HostListener } from '@angular/core';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  githubUsername: string = '';
  userInfo: any;
  userRepo: any;
  currentPage: number = 1;
  repoPerPage: number = 10;
  totalPages: number = 0;
  visiblePageCount: number = 5;
  loader1: boolean = false;
  loader2: boolean = false;
  buttonLoader: boolean = false;
  title: any = 'fyle-frontend-challenge';

  constructor(private apiService: ApiService) {
    this.updateVisiblePageCount();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateVisiblePageCount();
  }
  getUserData(username: string) {
    this.loader1 = true;
    this.buttonLoader = true;
    this.apiService.getUser(username).subscribe(
      (userData: any) => {
        this.userInfo = userData;
        this.currentPage = 1;
        this.totalPages = 1;
        if (this.userInfo.repos_url) {
          this.getRepos(1);
        }
        this.loader1 = false;
        this.buttonLoader = false;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.loader1 = false;
        this.buttonLoader = false;
      }
    );
  }
  async getRepos(page: number) {
    this.loader2 = true;
    this.currentPage = page;
    const res = await this.apiService.getRepositories(
      `${this.userInfo.repos_url}?per_page=${this.repoPerPage}&page=${this.currentPage}`
    );
    this.userRepo = res.data;
    this.loader2 = false;
    const linkHeader = res.headers.link;
    const parts = linkHeader.split(', ');
    for (const part of parts) {
      if (part.includes('rel="last"')) {
        const match = /page=(\d+)>; rel="last"/.exec(part);
        if (match) {
          this.totalPages = parseInt(match[1]);
          break;
        }
      }
    }
  }
  calculateVisiblePageRange(currentPage: number, totalPages: number): number[] {
    const halfCount = Math.floor(this.visiblePageCount / 2);
    let start = Math.max(currentPage - halfCount, 1);
    let end = Math.min(start + this.visiblePageCount - 1, totalPages);
    if (end - start + 1 < this.visiblePageCount) {
      start = Math.max(end - this.visiblePageCount + 1, 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  private updateVisiblePageCount(): void {
    const screenWidth = window.innerWidth;
    const isMobile1 = screenWidth < 668 && screenWidth > 500;
    const isMobile2 = screenWidth < 500 && screenWidth > 300;
    const isMobile3 = screenWidth < 300;
    this.visiblePageCount = isMobile1 ? 5 : isMobile2 ? 3 : isMobile3 ? 2 : 7;
  }
}