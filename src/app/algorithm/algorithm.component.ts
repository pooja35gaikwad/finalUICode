import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-algorithm',
  templateUrl: './algorithm.component.html',
  styleUrls: ['./algorithm.component.css']
})
export class AlgorithmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goPython(){
     

}
runScript(){
  console.log("script is running !!");
  $.ajax({
   // url: "/assets/hello.py",
   url: "/assets/multiple_csv_ui.py",
   context: document.body
  }).done(function() {
   alert('finished python script');;
  });
}
}
