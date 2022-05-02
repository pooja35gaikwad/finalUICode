import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DelayCalibrationComponent } from './delay-calibration/delay-calibration.component';

import { AlgorithmComponent } from './algorithm/algorithm.component';
import { ParametersComponent } from './parameters/parameters.component';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { HttpClientModule } from '@angular/common/http';
import { GetImageComponent } from './get-image/get-image.component';
import { ZoomService} from '@syncfusion/ej2-angular-maps';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
//import { IgxGeographicMapModule } from "igniteui-angular-maps";

@NgModule({

  declarations: [
    AppComponent,
    DelayCalibrationComponent,
    AlgorithmComponent,
    ParametersComponent,
    VisualisationComponent,
    GetImageComponent,
    FileUploadComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgHttpLoaderModule.forRoot(),
    //
    //IgxGeographicMapModule
  ],
  providers: [ZoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
