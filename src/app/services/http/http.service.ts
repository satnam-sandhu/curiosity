import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private url: UrlService, private http: HttpClient) {}

  getTreeData(path?: string) {
    return this.http.get(`${this.url.base}/tree?path=/${path || ''}`);
  }
  getFile(path: string) {
    return this.http.get(`${this.url.base}/file?path=/${path || ''}`);
  }
}
