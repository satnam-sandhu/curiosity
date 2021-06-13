import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  base = 'http://localhost:8080';
  constructor() {}
}
