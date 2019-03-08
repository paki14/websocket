import { Component } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { WebServiceService } from './web-service.service';
import { GetUser } from './get-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';

  // greetings: string[] = [];
  disabled = true;
  name: string;
  id:number
  private stompClient = null;

  constructor(private webService:WebServiceService) { }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      // this.greetings = [];
      // this.getCare1Details()
      this.user;
    }
  }
  user:GetUser[]
  careId:GetUser[]
  patientId:GetUser[]
  userid:number
  perid:number
  // getCare1Details(){
  //   return this.webService.getUser(this.user).subscribe(data=>{
  //     console.log(data)
  //     this.user=data;
  //   })
  // }
  // getCare2Details(){
  //   return this.webService.getUser(this.userid.id).subscribe(data=>{
  //     console.log(data)
  //     this.user=data;
  //   })
  // }

  connect() {
    const socket = new SockJS('http://localhost:8001/websocket/gkz-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);
      _this.sendName()
      _this.stompClient.subscribe('/topic/hi2', function (hello) {
        _this.showGreeting(JSON.parse(hello.body));
        // this.user=JSON.parse(hello);
      });
      _this.stompClient.subscribe('/topic/hi', function (hello2) {
        _this.showcareById(JSON.parse(hello2.body));
        // this.user=JSON.parse(hello);
      });
      // alert(this.user)
      _this.stompClient.subscribe('/topic/hi3', function (hello3) {
        _this.showcareByPatientId(JSON.parse(hello3.body));
        // this.user=JSON.parse(hello);
      });
      // alert(this.user)
    });
    // this.getCare2Details()
    // this.getCare1Details()
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
      // this.showGreeting(JSON.parse)
      // this.showcareById(JSON.parse)
      // this.showcareByPatientId(JSON.parse)
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    this.stompClient.send(
      '/gkz/hello2',
      {},
      JSON.stringify({})
    );
  }

  sendUserByName(){
    // var nameId= document.getElementById('name')
    this.stompClient.send(
      '/gkz/hello',
      {},
      JSON.stringify({'id':this.userid})
    );
  }
  sendUserByPatientName(){
    // var nameId= document.getElementById('name')
    this.stompClient.send(
      '/gkz/hello3',
      {},
      JSON.stringify({'id':this.perid})
    );
  }

  showGreeting(message) {
    this.user=message
    // this.greetings.push(message);
    // this.getCare1Details()
    // this.getCare2Details()
  }
  showcareById(message2){
    this.careId=message2
  }

  showcareByPatientId(message3){
    this.patientId=message3;
  }
 
}
