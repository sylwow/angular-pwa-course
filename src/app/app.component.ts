import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from "@angular/service-worker";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private swUpdate: SwUpdate) {

  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(available => {
        if (confirm('New version of app is available, load new version?')) {
          window.location.reload();
        }
      })
    }
  }

}

