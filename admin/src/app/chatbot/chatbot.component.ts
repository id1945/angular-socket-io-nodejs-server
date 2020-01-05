// Angular
import { Component, OnInit } from '@angular/core';
// Socket.io-client
import io from 'socket.io-client';
// URL server
const socket = io('http://localhost:3000');

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  public messages: any[] = [];

  constructor() { }

  ngOnInit() {
    // Socket get data form server
    socket.on('data1', (res) => {
      this.messages.push(res);
    })
  }

  public onKeyup(value): void {
    const message = { user: 'User', message: value};
    this.messages.push(message); // save to array
    socket.emit('data1', message); // send to server
  }

}
