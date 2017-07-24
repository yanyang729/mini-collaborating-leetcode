import { Component, OnInit } from '@angular/core';

declare const ace:any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  languages: string[] = ['java','Python'];
  language: string = 'Java';
  constructor() { }
  defaultContent = {
    java:'public class example(){}...',
    python: 'def example():'
  }

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/monokai')
    this.editor.getSession().setMode("ace/mode/java");
    this.editor.setValue(this.defaultContent['java']);
  }

  setLanguage(language: string): void{
    this.language = language;
    this.resetEditor();
  }

  resetEditor():void{
    console.log('Resetting editor...');
    this.editor.getSession().setMode(`ace/mode/${this.language.toLocaleLowerCase()}`);
    this.editor.setValue(this.defaultContent[this.language]);
  }

  submit(){
    const userCodes = this.editor.getValue();
    console.log(userCodes)

  }
}
