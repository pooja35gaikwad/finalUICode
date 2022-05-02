import { Component, OnInit } from '@angular/core';
import { HeatMap } from '@syncfusion/ej2-heatmap';
import { DataService, MatrixData } from '../service/data.service';
import * as CanvasJS from './canvasjs.min.js'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  fileInfos?: Observable<any>;
  constructor(private service: DataService) { }
  chart: any;
  chart1: any;
  ngOnInit(): void {
  }
  navbarOpen = true;

  

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onPress() {
    console.log(this.service.getMatrix());
    this.service.getMatrix().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
  }
  

  onPress1() {
    console.log(this.service.getMatrix());
    this.service.getMeanSubtractedMatrix().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
  }

  onPress2() {
    console.log(this.service.getMatrix());
    this.service.getRangeDopplerImageMatrix().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
  }

  onPress3() {
    console.log(this.service.getMatrix());
    this.service.getSVDTarget().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
  }

  onPress4() {
    console.log(this.service.getMatrix());
    this.service.getSVDClutter().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
  }

  getTrajectory() {
    // this.display = !this.display;
    console.log(this.service.getStDeviation());

    this.service.getHighPeak().subscribe(
      response => this.handleSuccessfulResponse2(response)
    );
    //console.log("Welcome here");
    console.log("this is last line of code");
  }
  handleSuccessfulResponse2(response: number[]) {
   
    const dps = [] as any;
    for (var i =0; i <= 31; i++) {
      dps.push({
        // x: Freqarray[i],
        // y: Realarray[i]
        // x: [i*4],
        // y: Realarray[i]
       y: response[i],
        x: i*15/31
       // x: [i*15/201],
        // y: response.magnitude[i]
       
      })
    }

    this.chart1 = new CanvasJS.Chart("container", {
      animationEnabled: true,
      axisY: {
      //  title: "Range",
        //  suffix: "Hz",
        // maximum: 804,
      //  maximum: 32,
      //  minimum: 0,
       // maximum: 1
        //  minimum:500000000
      },
      axisX: {
       // title: "Amplitude",
        // suffix: "m",
     // maximum: 80,
     //   minimum: 0

      },
      title:{
        //text: "Range Plot"              
      },
      data: [
        {
          markerType:  "cross",  //"circle", "square", "cross", "none"
          type: "spline",
          color: "red",

        //  toolTipContent: "<b>Area: </b>{x} sq.ft<br/><b>Price: </b>${y}k",
          dataPoints: dps
        }
      ]

    });

    this.chart1.render();
  }
  handleSuccessfulResponse(response: MatrixData) {

    let heatmapData = response;
    var heatmap = new HeatMap({
    titleSettings: {
      text: 'B-Scan Image',
      textStyle: {
          size: '15px',
          fontWeight: '500',
          fontStyle: 'Normal',
          fontFamily: 'Segoe UI'
      }
  },
   cellSettings: {
      showLabel: true,
      enableCellHighlighting: true,
      border: {
        width: 0,
      //   radius: 4,
      //  color: 'red'
    }
  },
     paletteSettings: {
      //  colorGradientMode: 'Table',
        palette: [
        //   //    { color: 'rgb(255, 0, 0)' },
        //   //    { color: '#6C5B7B', label:'Moderate', value:0.002},
        //   //   { color: '#355C7D', label:'High', value: 0.003 }
          { color: '#172957' },
          { color: '#172957' },
          { color: '#0000ff' },
          { color: '#00ffff' },
         { color: '#00ff00' },
        { color: '#ffff00' },
        { color: '#ff0000' },
        { color: '#000000' },
        { color: '#000000' },
       { color: '#ffffff' }
         
         








         
        ],
        type: "Gradient",
      },
    xAxis: {
      // labels: ['1', '2'],
        labelRotation: 45,
        labelIntersectAction: 'None',

      },

      yAxis: {

     //   labels: ['32','31','30', '29', '28', '27', '26', '25', '24', '23', '22', '21', '20', '19', '18', '17', '16', '15', '14', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1']
      },
  dataSource: heatmapData,
 
}, '#element');
 }
 selectFiles(event): void {
  this.message = [];
  this.progressInfos = [];
  this.selectedFiles = event.target.files;
}
 uploadFiles(): void {
  this.message = [];
  if (this.selectedFiles) {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
}

upload(idx: number, file: File): void {
  this.progressInfos[idx] = { value: 0, fileName: file.name };
  if (file) {
    this.service.upload(file).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } 
        else if (event instanceof HttpResponse) {
          const msg = 'Uploaded the file successfully: ' + file.name;
          this.message.push(msg);
          this.fileInfos = this.service.getFiles();
        }
      },
      error: (err: any) => {
        this.progressInfos[idx].value = 0;
        const msg = 'Could not upload the file: ' + file.name;
        this.message.push(msg);
        this.fileInfos = this.service.getFiles();
      }
    });
  }
}
}
