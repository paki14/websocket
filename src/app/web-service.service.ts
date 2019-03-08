import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GetUser } from './get-user';


const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  constructor(private http: HttpClient) { }

  userUrl="http://localhost:8001/websocket/careperson"


getUser(data){
  return this.http.get<GetUser[]>(this.userUrl+"/"+data);
}
}
