import { Component, OnInit, Inject } from '@angular/core';
import { CollaborationService } from '../../services/collaboration.service'
import { ActivatedRoute, Params } from '@angular/router';

declare const ace:any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  sessionId: string;
  languages: string[] = ['java','Python'];
  themes:string[] = ['xcode','monokai'];
  theme:string = 'xcode';
  language: string = 'java';
  output:string = ''; 
  constructor(private collaboration: CollaborationService,
              private route: ActivatedRoute,
              @Inject('data') private data,
            ) { }

  defaultContent = {
    'java': `public class Example {
    public static void main(String[] args) { 
        // Type your Java code here 
        } 
    }`,
    'Python': 
    `class Solution: 
    def example(self): 
        # Write your Python code here`
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionId = params['id']
    });
    this.initEditor();
  }

  initEditor(){
    this.editor = ace.edit('editor');
    this.editor.$blockScrolling = Infinity;
    this.editor.setTheme('ace/theme/xcode');
    this.editor.getSession().setMode("ace/mode/java");
    this.editor.setValue(this.defaultContent['java']);
    this.editor.setShowPrintMargin(false);

    document.getElementsByTagName('textarea')[0].focus();

    this.editor.lastAppliedChanged = null;
    this.collaboration.init(this.editor,this.sessionId);

    //register change callback
    this.editor.on('change',e=>{
      console.log('editor changed: ' + JSON.stringify(e));
      if ( this.editor.lastAppliedChanged != e){
        this.collaboration.change(JSON.stringify(e));
      }
    })

    //cursor
    this.editor.getSession().getSelection().on('changeCursor',()=>{
      const cursor = this.editor.getSession().getSelection().getCursor();
      console.log('cursor ' + JSON.stringify(cursor));
      this.collaboration.cursorMove(JSON.stringify(cursor));
    })

    //restore
    this.collaboration.restoreBuffer();
  }

  setLanguage(language: string): void{
    this.language = language;
    this.resetEditor();
  }

  setTheme(theme:string):void{
    this.theme = theme;
    this.resetEditor();
  }

  resetEditor():void{
    console.log('Resetting editor...');
    this.editor.setTheme(`ace/theme/${this.theme}`);
    this.editor.getSession().setMode(`ace/mode/${this.language.toLocaleLowerCase()}`);
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = '';
  }

  submit(){
    this.output = '';
    const userCodes = this.editor.getValue();
    console.log(userCodes)
    const codes = {
      userCodes:userCodes,
      lang: this.language.toLocaleLowerCase()
    }
    // this.data.buildAndRun(codes).then(res => this.output = res.text)
    this.data.buildAndRun(codes).subscribe(
      observer => this.output =  observer.text
    )
  }
}
