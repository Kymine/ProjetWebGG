import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {PrivateMessageModel} from "../../models/PrivateMessageModel";
import {USER} from "../../constants/user";
import {LoginService} from "../login/login.service";

@Injectable()
export class PrivateMessageServices {

  private url: string;
  public privateMessageList$: ReplaySubject<PrivateMessageModel[]>;
  public pageNumber: number;
  public currentUser: string;

  constructor(private http: Http, private loginService: LoginService) {
    this.url = "http://projet-3a.7ight.com/api/users";
    this.privateMessageList$ = new ReplaySubject(1);
  }

  public getMessages(side: number, correspondentUser: string) {
    this.currentUser = correspondentUser;
    let pageSelector = "";
    if (side === 0) {
      if (this.pageNumber !== 0) {
        this.pageNumber--;
      }
      pageSelector = "&page=" + this.pageNumber;
    } else if (side === 1) {
      this.pageNumber++;
      pageSelector = "&page=" + this.pageNumber;
    } else {
      this.pageNumber = 0;
    }
    const finalUrl = this.url + "/" + this.loginService.username + "/messages?currentUserId=" + correspondentUser + pageSelector;
    this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateMessageList(response));
  }

  public postMessage(correspondentUser: string, message: PrivateMessageModel) {
    const finalUrl = this.url + "/" + correspondentUser + "/messages";
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    this.http.post(finalUrl, message, options)
      .subscribe((response) => this.extractMessageAndGetMessages(response, correspondentUser));
  }

  private extractMessageAndGetMessages(response: Response, correspondentUser: string): PrivateMessageModel {
    const messageList = response.json() || [];
    this.privateMessageList$.next(messageList);
    this.getMessages(2, correspondentUser);
    return messageList[0];
  }

  extractAndUpdateMessageList(response: Response) {
    const messageList = response.json() || [];
    if (messageList.length === 0) {
      if (this.pageNumber !== 0) {
        this.pageNumber--;
      }
    } else {
      this.privateMessageList$.next(messageList);
    }
  }
}
