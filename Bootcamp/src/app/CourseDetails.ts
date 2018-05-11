export class Course{
  _id?:string;
  AcademyId:string;
  ProgramType:number;
  ProgramDuration:number;
  ProgramName:string;
  ProgramDescription:string;
  ProgramSubject:string;
  ProgramLocationId:string;
  Cost:string;
  StartDate:string;
  Length:number;
  Classsize:string;
  Commitment:string;
  CreatedOn?:string;
  UpdatedOn?:string;
  Active?:boolean;
}

export class Academy{
  _id?:number;
  AcademyName:string;
  AcademyWebsite:string;
  AcademyLogo:string;
  AcademyProfileImage:string;
  AcademyFounded:string;
  Headquarters:string;
  AcademyDiscription:string;
  ZipCode:string;
  EmailId:string;
  Password:string;
  UpdatedOn?:any;
}
