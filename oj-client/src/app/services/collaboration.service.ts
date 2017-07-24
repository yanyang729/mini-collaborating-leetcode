import { Injectable } from '@angular/core';

declare const io: any;

@Injectable()
export class CollaborationService {
  collaborationSocket:any;
  constructor() { }

  init():void{
    this.collaborationSocket = io(window.location.origin,{query:'message='+'hahahaha'});
    this.collaborationSocket.on('message',(message) =>{
      console.log('received ' + message)
    })

  }
}
