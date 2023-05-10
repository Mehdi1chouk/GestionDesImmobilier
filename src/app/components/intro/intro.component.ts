import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = ' rgb(230, 247, 255)';
  }



}
