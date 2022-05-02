import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CSVDataBean, DataService } from '../service/data.service';
import * as CanvasJS from './canvasjs.min.js';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Router } from '@angular/router';
import { stringCompare1 } from 'igniteui-angular-core';



export class FreqParams {
  constructor(
    public startFreq: number,
    public stopFreq: number,
    public noOfPoints: number,

  ) {

  }
}

@Component({
  selector: 'app-delay-calibration',
  templateUrl: './delay-calibration.component.html',
  styleUrls: ['./delay-calibration.component.css']
})

export class DelayCalibrationComponent implements OnInit {

  name!: string ;
  img1!: string[];
  freq!: BigInteger[];
  real!: Float32List[];
  magnitude!: number[];
  startFreq!: number;
  stopFreq!: number;
  numberOfpoints!: number;
  fileno!:number;
  scans!:number;
  expNAME! : string;
  targetinfo! : string;
  constructor(private service: DataService,private spinner: SpinnerVisibilityService, private router: Router) { 
   
  }
  chart: any;
  chart1: any;
  function(e) {
    if(e.target.checked){
     console.log(this.service.executeMethod());
 
     this.service.executeMethod().subscribe(
    
    //   response => this.handleSuccessfulResponse(response)
     );
     //console.log("Welcome here");
     console.log("this is last line of code");
    }
    else{
 
    }
  }
  goToParameters() {
  
    this.router.navigateByUrl('/parameters')
  }
  
  successNotification() {
    Swal.fire('Hi', 'We have been informed!', 'success');
  }

  getExperimentName(){
    console.warn
  }
  saveParameters(val) {
   this.service.setParameters(val).subscribe(
     
   )
    this.startFreq = val.startFreq;
    this.stopFreq = val.stopFreq;
    this.numberOfpoints = val.numberOfpoints;
    this.scans = val.scans;

    console.log(val);
  }
//   savename(val){
//   this.service.setexpName(val).subscribe()
//   this.expNAME = val.expName;
// }
  


  ngOnInit(): void {
  }
  display = false;

  onPress1() {
    // this.display = !this.display;
    console.log(this.service.executeMethod());

    this.service.executeMethod().subscribe(
      response => this.handleSuccessfulResponse(response)
      
    );
    //console.log("Welcome here");
    console.log("this is last line of code");
  }

  onPress() {
    // this.display = !this.display;
    console.log(this.service.getStDeviation());


    this.service.getStDeviation().subscribe(
      response => this.handleSuccessfulResponse1(response)
    );

    targetinfo : String ;
   this.service.gettargetinfo().subscribe(
   response => this.name = response.message 
    
   );
  
  

    //console.log("Welcome here");
    console.log("this is last line of code");
  }

 
  async onPress111(val)
  {
    this.service.setFileno(val).subscribe()
      this.expNAME = val.expName;
      this.fileno = val.fileno;
   
      console.log("We have been informed!");
      alert("Hello! I am an alert box!");
    //this.spinner.show()
    // {
    //     Swal.fire('Hi', 'We have been informed!', 'success');
    //   }
     //  Swal.fire('Hi', 'We have been informed!', 'success');
      
  } 
  
  handleSuccessfulResponse1(response: number[]) {
    
    // this.img1=response.img;
    // this.freq=response.freq;
    // this.real=response.real;
    



    const dps = [] as any;


    for (var i =0; i <= 201; i++) {
      dps.push({
        // x: Freqarray[i],
        // y: Realarray[i]
        // x: [i*4],
        // y: Realarray[i]

        x: [i*15/201],
        // y: response.magnitude[i]
        y: response[i+17]
      })
    }

    this.chart1 = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      axisX: {
        title: "Range",
        //  suffix: "Hz",
        // maximum: 804,
        maximum: 15,
        minimum: 0
        //maximum: 1000000000,
        //  minimum:500000000
      },
      axisY: {
        title: "Amplitude",
        // suffix: "m",
        // maximum: 5,
        // minimum: -2

      },
      title:{
        text: "Range Plot"              
      },
      data: [
        {
          type: "spline",
          dataPoints: dps
        }
      ]

    });

    this.chart1.render();
  }
  
  handleSuccessfulResponse(response: CSVDataBean) {
    console.log(response.freq);
    console.log(response.real);
    console.log(response.img);
    console.log(response.magnitude);
    // this.img1=response.img;
    // this.freq=response.freq;
    // this.real=response.real;
    var Freqarray: Array<any> = response.freq;
    //var Magarray: Array<any> = response.magnitude;
    // var Magarray : any[] = response.magnitude;
    var Realarray: Array<any> = response.real;
    var Imgarray: Array<any> = response.img;



    const dps1 = [] as any;


    for (var i = 0; i <= 201; i++) {
      dps1.push({
        // x: Freqarray[i],
        // y: Realarray[i]
        // x: [i*4],
        // y: Realarray[i]

        x: [i],
        // y: response.magnitude[i]
        y: response.fftMagnitude[i]
      })
    }

    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      axisX: {
        title: "Frequency",
        //  suffix: "Hz",
        // maximum: 804,
        maximum: 201,
        minimum: 0
        //maximum: 1000000000,
        //  minimum:500000000
      },
      axisY: {
        title: "Amplitude",
        // suffix: "m",
        // maximum: 5,
        // minimum: -2

      },
      data: [
        {
          type: "spline",
          dataPoints: dps1
        }
      ]

    });

    this.chart.render();
  }

}


