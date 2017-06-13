import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {URLSERVER} from "../../constants/urls";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {PrivateMessageModel} from "../../models/PrivateMessageModel";



@Injectable()
export class PrivateMessageServices {

  private url: string;
  public privatemessageList$: ReplaySubject<PrivateMessageModel>;

  constructor(private http: Http) {
    this.url = "http://projet-3a.7ight.com/api/users";
    this.privatemessageList$ = new ReplaySubject(1);
  }

  public getMessages(correpondentUser: string) {
    const finalUrl = this.url + "/groupeg/messages?currentUserId=" + correpondentUser;
    this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateMessageList(response));
  }

  public postMessage(correspondantUser: string, message: PrivateMessageModel) {
    const finalUrl = this.url + "users/" + correspondantUser + "/messages";
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    this.http.post(finalUrl, message, options)
      .subscribe((response) => this.extractMessageAndGetMessages(response, correspondantUser));
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
