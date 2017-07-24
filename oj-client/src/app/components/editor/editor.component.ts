import { Component, OnInit } from '@angular/core';
import { CollaborationService } from '../../services/collaboration.service'

declare const ace:any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  languages: string[] = ['java','Python'];
  themes:string[] = ['xcode','monokai'];
  theme:string = 'xcode';
  language: string = 'java';
  constructor(private collaboration: CollaborationService) { }

  defaultContent = {
    'java': 'public class Example{}',
    'Python': 'def example():',

  }


  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.$blockScrolling = Infinity;
    this.editor.setTheme('ace/theme/xcode');
    this.editor.getSession().setMode("ace/mode/java");
    this.editor.setValue(this.defaultContent['java']);
    this.editor.setShowPrintMargin(false);
    this.collaboration.init();
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
  }

  submit(){
    const userCodes = this.editor.getValue();
    console.log(userCodes)
  }
}
