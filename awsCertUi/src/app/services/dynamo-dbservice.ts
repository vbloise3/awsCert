import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const serviceCreate = '/api/dynamoDBcreate';
const serviceInitialDataLoad = '/api/dynamoDBinitialDataLoad';
const serviceAddItem = '/api/dynamoDBaddItem';
const serviceGetOneItem = '/api/c2pqanda';
const serviceUpdateOneItem = '/api/updateQandA';
const serviceDeleteOneItem = '/api/deleteQandA';
const serviceDeleteTable = '/api/deleteTable';
const serviceListBucketContents = '/api/listBucketContents';
//const serviceGetAllItems = 'https://ts44kzo19l.execute-api.us-east-1.amazonaws.com/dev/getAllQandAsC2p';
const serviceGetAllItems = 'https://nx4mzo1d9f.execute-api.us-east-1.amazonaws.com/dev/getAllQandAsC2p';
const serviceGetAllArchItems = 'https://nx4mzo1d9f.execute-api.us-east-1.amazonaws.com/dev/getAllQandAsArch';
const serviceGetAllDevItems = 'https://nx4mzo1d9f.execute-api.us-east-1.amazonaws.com/dev/getAllQandAsDev';
const serviceGetAllMLItems = 'https://nx4mzo1d9f.execute-api.us-east-1.amazonaws.com/dev/getAllQandAsML';


export interface QandA {
  id: string;
  category: string;
  subcategory: string;
  questionType: string;
  question: string;
  answers: any;
  correctAnswer: any;
}

export interface Answer {
  answer: string;
  correctOrNot: boolean;
}

export interface  Movie {
  year: string;
  title: number;
  plot: number;
  rating: string;
}

@Injectable()
export class DynamoDbserviceService {

  constructor(private http: HttpClient) { }

  createC2PQandATable() {
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    return this.http.get(serviceCreate, {headers: headers});
  }

  loadInitialData() {
    let resultData;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.get(serviceInitialDataLoad, {headers: headers});
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  addItem(inQandA) {
    let resultData;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.post(serviceAddItem, inQandA, { headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  getOneItem(inQandA) {
    let resultData;
    const url = serviceGetOneItem + '/:' + inQandA.id + '/:' + inQandA.category;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.get(url, { headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  getAllItems(subcategories) {
    let resultData;
    let url = serviceGetAllItems + '/';
    // alert('getting this url: ' + url);
    let headers = new HttpHeaders();
    subcategories.forEach(function (subcategoryItem) {
      /*url = url + '/' + encodeURI(subcategoryItem);*/
      url = url + encodeURI(subcategoryItem) + ':';
    });
    /*headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');*/
    resultData = this.http.get(url, { headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  getAllArchItems(subcategories) {
    let resultData;
    let url = serviceGetAllArchItems + '/';
    // add parameters to url
    // url = url + '/S3/CloudFront/IAM';
    subcategories.forEach(function (subcategoryItem) {
      /*url = url + '/' + encodeURI(subcategoryItem);*/
      url = url + encodeURI(subcategoryItem) + ':';
    });
    // remove last :
    // url = url.substring(0, url.length - 1);
    // alert('getting this url: ' + url);
    let headers = new HttpHeaders();
    /*headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');*/
    resultData = this.http.get(url, { headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  getAllDevItems(subcategories) {
    let resultData;
    let url = serviceGetAllDevItems + '/';
    // add parameters to url
    // url = url + '/S3/CloudFront/IAM';
    subcategories.forEach(function (subcategoryItem) {
      /*url = url + '/' + encodeURI(subcategoryItem);*/
      url = url + encodeURI(subcategoryItem) + ':';
    });
    // remove last :
    // url = url.substring(0, url.length - 1);
    // alert('getting this url: ' + url);
    let headers = new HttpHeaders();
    /*headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');*/
    resultData = this.http.get(url, { headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  getAllMLItems(subcategories) {
    let resultData;
    let url = serviceGetAllMLItems + '/';
    // add parameters to url
    // url = url + '/S3/CloudFront/IAM';
    subcategories.forEach(function (subcategoryItem) {
      /*url = url + '/' + encodeURI(subcategoryItem);*/
      url = url + encodeURI(subcategoryItem) + ':';
    });
    // remove last :
    // url = url.substring(0, url.length - 1);
    // alert('getting this url: ' + url);
    let headers = new HttpHeaders();
    /*headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');*/
    resultData = this.http.get(url, { headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  escapeHtml(text) {
    return text
      .replace(/\</g, '%3C')
      .replace(/\>/g, '%3E')
      .replace(/\"/g, '%22')
      .replace(/\'/g, '%27')
      .replace(/!/g, '%21')
      .replace(/\./g, '%2E')
      .replace(/\?/g, '%3F');
      /*.replace(/\#/g, '%23')
      .replace(/\* /g, '%2A')
      .replace(/\%/g, '%25')
      .replace(/\&/g, '%26')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\+/g, '%2B')
      .replace(/\-/g, '%2D')
      .replace(/\:/g, '%3A')
      .replace(/\;/g, '%3B')
      .replace(/\=/g, '%3B')
      .replace(/\@/g, '%40')
      .replace(/\$/g, '%24')*/
  }

  updateOneItem(inQandA: QandA) {
    let resultData;
    // alert('service received: ' + inQandA.id + ' ' + inQandA.category + ' ' + inQandA.subcategory + ' ' + inQandA.questionType + ' ' + inQandA.question);
    const url = this.escapeHtml(serviceUpdateOneItem + '/:' + inQandA.id + '/:' + inQandA.category + '/:' + inQandA.subcategory + '/:' + inQandA.questionType + '/:' + inQandA.question);
    // alert('encoded uri: ' + url);
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.put(url, { headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  deleteOneItem(inQandA) {
    let resultData;
    const url = serviceDeleteOneItem + '/:' + inQandA.id + '/:' + inQandA.category;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.delete(url, { headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  deleteTable(inQandA) {
    let resultData;
    const url = serviceDeleteTable + '/:' + inQandA.tableName;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.delete(url, { headers: headers });
    // alert('loadInitialData service result: ' + JSON.stringify(resultData));
    return resultData;
  }

  listS3BucketContents(inBucket) {
    let resultData;
    const url = serviceListBucketContents + '/:' + inBucket;
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    resultData = this.http.get(url, { headers: headers });
    // alert('bucket contents: ' + JSON.stringify(resultData));
    return resultData;
  }
}
