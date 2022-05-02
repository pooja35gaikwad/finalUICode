import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlgorithmComponent } from './algorithm/algorithm.component';
import { DelayCalibrationComponent } from './delay-calibration/delay-calibration.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { GetImageComponent } from './get-image/get-image.component';
import { ParametersComponent } from './parameters/parameters.component';
import { VisualisationComponent } from './visualisation/visualisation.component';

const routes: Routes = [
  {
    path: 'delay-calibration', component: DelayCalibrationComponent
  },
  {
    path: 'algorithm', component: AlgorithmComponent
  },
  {
    path: 'visualisation', component: VisualisationComponent
  },
  {
    path: 'parameters', component: ParametersComponent
  },
  {
    path: 'get-image', component: GetImageComponent
  },
  {
    path: 'file-upload', component: FileUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
