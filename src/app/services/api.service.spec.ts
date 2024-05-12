import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import axios from 'axios';
import * as MockAdapter from 'axios-mock-adapter';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;
  let axiosMock: MockAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    axiosMock = new MockAdapter(axios);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should call the getUser method with the correct URL', () => {
    const username = 'testuser';
    const expectedUrl = `https://api.github.com/users/${username}`;

    apiService.getUser(username).subscribe();
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
  });
  it('should call the getRepositories method with the correct URL', async () => {
    const url = 'https://api.github.com/users/testuser/repos';
    const responseData = [{ name: 'repo1' }, { name: 'repo2' }];

    axiosMock.onGet(url).reply(200, responseData);

    const result = await apiService.getRepositories(url);
    expect(result.data).toEqual(responseData);
  });
});