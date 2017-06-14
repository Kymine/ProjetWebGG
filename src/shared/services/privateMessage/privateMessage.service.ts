import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {URLSERVER} from "../../constants/urls";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {PrivateMessageModel} from "../../models/PrivateMessageModel";
import {USER} from "../../constants/user";



@Injectable()
export class PrivateMessageServices {

  private url: string;
  public privatemessageList$: ReplaySubject<PrivateMessageModel[]>;

  constructor(private http: Http) {
    this.url = "http://projet-3a.7ight.com/api/users";
    this.privatemessageList$ = new ReplaySubject(1);
  }

  public getMessages(correpondentUser: string) {
    const finalUrl = this.url + "/" + USER + "/messages?currentUserId=" + correpondentUser;
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
    this.privatemessageList$.next(messageList);
    this.getMessages(correspondentUser);
    return messageList[0];
  }

  extractAndUpdateMessageList(response: Response) {
    const messageList = response.json() || [];
    this.privatemessageList$.next(messageList);
  }



}
