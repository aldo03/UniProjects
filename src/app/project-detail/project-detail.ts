export class ProjectDetail {

  constructor(){
    this.tags = new Array();
    this.tags[0]="";
    this.tags[1]="";
    this.tags[2]="";
  }

  title: string;
  authors: Array<string>;
  tags: Array<string>;
  department: string;
  picture: string;
  presentation: string;
  abstract: string;
  files: Array<string>;
  dldesc: string;
  authorsPicture: Array<string>;
}
