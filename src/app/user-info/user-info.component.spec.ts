import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
    let component: UserInfoComponent;
    let fixture: ComponentFixture<UserInfoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UserInfoComponent]
        });
        fixture = TestBed.createComponent(UserInfoComponent);
        component = fixture.componentInstance;
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain an h2 and img element', () => {
        const imgElement: HTMLElement = fixture.nativeElement.querySelector('img');
       
        const h2Element: HTMLElement = fixture.nativeElement.querySelector('h2');
        expect(imgElement).toBeTruthy();
        expect(h2Element).toBeTruthy();
    });

    it('should contain paragraphs for bio, location, and blog', () => {
        const bioElement: HTMLElement = fixture.nativeElement.querySelector('.user-bio');
        const locationElement: HTMLElement = fixture.nativeElement.querySelector('.user-location');
        const blogElement: HTMLElement = fixture.nativeElement.querySelector('.user-blog');

        expect(bioElement).toBeTruthy();
        expect(locationElement).toBeTruthy();
        expect(blogElement).toBeTruthy();
    });

    it('should contain links in the blog paragraph', () => {
        const blogLink: HTMLAnchorElement = fixture.nativeElement.querySelector('.user-blog');
        expect(blogLink).toBeTruthy();
    });
    it('should bind user information to the template', () => {
        const userInfo = {
            avatar_url: 'https://example.com/avatar.png',
            name: 'John Doe',
            bio: 'Software Developer',
            location: 'New York, USA',
            blog: 'https://johndoe.com',
        };

        component.userInfo = userInfo;
        fixture.detectChanges();

        const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
        const h2Element: HTMLElement = fixture.nativeElement.querySelector('h2');
        const bioElement: HTMLElement = fixture.nativeElement.querySelector('.user-bio');
        const locationElement: HTMLElement = fixture.nativeElement.querySelector('.user-location');
        const blogLink: HTMLAnchorElement = fixture.nativeElement.querySelector('.user-blog');

        expect(imgElement.getAttribute('src')).toEqual(userInfo.avatar_url);
        expect(h2Element.textContent).toContain(userInfo.name);
        expect(bioElement.textContent).toContain(userInfo.bio);
        expect(locationElement.textContent).toContain(userInfo.location);
        expect(blogLink.getAttribute('href')).toEqual(userInfo.blog);
    });
});