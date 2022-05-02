import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


export class CSVDataBean {
  constructor(public freq: BigInteger[],
    public real: Float32List[], public img: string[], public magnitude: number, public fftMagnitude: number) {

  }
}


 export class TargetInfo{
   constructor(public message: string){}
 }
export class MatrixData {
  constructor(public matrix: number[][],
  ) {

  }
}
export class FreqParams {
  constructor(
    public startFreq: number,
    public stopFreq: number,
    public noOfPoints: number,

  ) {

  }
}

export class ExpNameAndFileNo {
  constructor(
    public expName: string,
    public fileno: number,
   

  ) {

  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  executeMethod() {
    return this.http.get<CSVDataBean>('http://localhost:8070/vnaConnect')
    //  console.log("Hello-world-bean-service");
  }

clearfiles()
{
  return this.http.get('http://localhost:8070/getfiles')
}
  getMatrix() {
    return this.http.get<MatrixData>('http://localhost:8070/getBScan')
  }

  getMeanSubtractedMatrix() {
    return this.http.get<MatrixData>('http://localhost:8070/getMeanSubtractedBScan')
  }
  getRangeDopplerImageMatrix() {
    return this.http.get<MatrixData>('http://localhost:8070/getRangeDopplerImage')
  }
  
  getSVDTarget() {
    return this.http.get<MatrixData>('http://localhost:8070/getTargetFromSVD')
  }

  getSVDClutter() {
    return this.http.get<MatrixData>('http://localhost:8070/getClutterFromSVD')
  }

  getStDeviation() {
    return this.http.get<number[]>('http://localhost:8070/getStDeviation')
  }

  getHighPeak() {
    return this.http.get<number[]>('http://localhost:8070/getSingleHighPeak')
  }


  setexpName(string){
    return this.http.post(
                `http://localhost:8070/setname`
                , string);
  }

  setParameters(freqParams){
    return this.http.post(
                `http://localhost:8070/setParameters`
                , freqParams);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('files', file);
    const req = new HttpRequest('POST', `http://localhost:8070/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }


  getFiles(): Observable<any> {
    return this.http.get(`http://localhost:8070/files`);
  }
  setFileno(ExpNameAndFileNo){
    return this.http.post(
                `http://localhost:8070/saveData`
                , ExpNameAndFileNo);
               
  };
  gettargetinfo(){

    return this.http.get<TargetInfo>(`http://localhost:8070/gettargetinfo`);
  }
}