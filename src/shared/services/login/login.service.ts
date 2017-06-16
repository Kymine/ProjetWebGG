import {Injectable} from "@angular/core";

@Injectable()
export class LoginService {

  public username: string;
  public status: boolean;

  constructor() {
    this.username = "";
    this.status = false;
  }

  login(user: string) {
    if (user !== "") {
      this.username = user;
      this.status = true;
    }
  }

  logout() {
    this.username = "";
    this.status = false;
  }

}
