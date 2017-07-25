import { Injectable } from '@angular/core';

declare const io: any;

@Injectable()
export class CollaborationService {
  collaborationSocket:any;
  constructor() { }

  init(editor:any,sessionId:string):void{
    this.collaborationSocket = io(window.location.origin,{query:'sessionId='+ sessionId});
    // this.collaborationSocket.on('message',(message) =>{
    //   console.log('received ' + message)
    // })
    this.collaborationSocket.on('change',(delta:string) =>{
      console.log('collaboration: editor changes by' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChanged = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    })
  }
  change(delta:string):void{
    this.collaborationSocket.emit('change',delta);
  }
}
