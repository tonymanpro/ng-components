import { JsonTestService } from './json-test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

  constructor(
    private jsonTestService: JsonTestService,
  ) { }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {

    this.jsonTestService.get('prueba', 'posts')
      .subscribe(
        (response) => {
          console.log('get', response);
        }
      );
  }
  decirHola() {
    console.log('Hola');
  }
}

