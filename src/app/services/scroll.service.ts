import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  shown: boolean = false;

  constructor() { }


  hide() { this.shown = false; }

  show() { this.shown = true; }







}
