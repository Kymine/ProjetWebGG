import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {URLSERVER} from "../../constants/urls";
import {ReplaySubject} from "rxjs/ReplaySubject";
@Injectable()
export class PrivateChannelService {

  private url: string;
  public userList$: ReplaySubject<string[]>;
  public currentPrivateChannel: string;
  public channelType: number;

  constructor(private http: Http) {
    this.url = "http://projet-3a.7ight.com/api/users";
    this.userList$ = new ReplaySubject(1);
  }


  public getUsers() {
    this.http.get(this.url)
      .subscribe((response) => this.extractAndUpdatePrivateChannelList(response));
  }


  extractAndUpdatePrivateChannelList(response: Response) {
    const privatechannelList = response.json() || [];
    this.userList$.next(privatechannelList);
  }
}
