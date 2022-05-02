import { Component, OnInit } from '@angular/core';
import { HeatMap, Legend, Tooltip, ITooltipEventArgs } from '@syncfusion/ej2-heatmap';
import { MatrixData, DataService } from '../service/data.service';
HeatMap.Inject(Legend, Tooltip);
@Component({
  selector: 'app-get-image',
  templateUrl: './get-image.component.html',
  styleUrls: ['./get-image.component.css']
})

export class GetImageComponent implements OnInit {
  ctx: any;
  canvas: any;

  margin: Object;
  legendLabel: Object;
  legendCollection: Array<Object>;

  constructor(private service: DataService) {
    this.margin = { 'left': 25, 'right': 25 };
    this.legendLabel = { 'text': 'poor' };
    this.legendCollection = ['heatmaplegend'];

  }

  ngOnInit(): void { }
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

 

  
  // }
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
       // { color: '#000000' },
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
 
}




