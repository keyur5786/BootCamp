export class User{
  _id?:string;

  FirstName:string;
  LastName:string;
  UserName:string;
  Password:string;
  CreatedBy?:string;
    UpdatedBy?:string;
      CreatedIp?:string;
          UpdatedIp?:string;
            CreatedOn?:string;
              UpdatedOn?:any;
              Active?:boolean;

}

export class UserRights{
  _id?:string;
  UserId:string;
  FormName:string;
  Rights:string;
  Add:string;
  Edit:string;
  Delete?:string;
    View?:string;
    CreatedBy?:string;
      UpdatedBy?:string;
      CreatedIp?:string;
          UpdatedIp?:string;
            CreatedOn?:string;
              UpdatedOn?:any;
              Active?:boolean;

}
