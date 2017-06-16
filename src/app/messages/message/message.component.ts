import {Component, Input, OnInit} from "@angular/core";

import {MessageModel} from "../../../shared/models/MessageModel";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})

export class MessageComponent implements OnInit {

  @Input() message: MessageModel;

  stringList: string[];
  result: string;

  constructor() {
    this.message = new MessageModel(0, "");
  }

  /**
   * Fonction ngOnInit.
   * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
   * Notre composant qui prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur. Si vous souhaitez manipuler votre message lors du chargement du composant, vous devez
   * le faire dans le ngOnInit.
   */
  ngOnInit() {
    if (this.message.content != null) {
      this.stringList = this.message.content.split(" ");
      let tmp: string[];
      tmp = [];
      let stringNotUrl = "";
      for (let i = 0; i < this.stringList.length; i++) {
        if (this.isAnUrl(this.stringList[i])) {
          if (stringNotUrl.length > 0) {
            tmp.push(stringNotUrl);
          }
          stringNotUrl = "";
          tmp.push(this.stringList[i]);
        }
        if (this.notUrl(this.stringList[i])) {
          stringNotUrl += this.stringList[i] + " ";
        }
      }
      if (tmp.length === 0) {
        tmp.push(stringNotUrl);
      }
      this.stringList = tmp;
    }
  }

  notUrl(characters: string): boolean {
    return !this.isAnUrl(characters);
  }

  isAnUrl(characters: string): boolean {
    let result = false;
    if (characters.startsWith("http://") || characters.startsWith("https://")) {
      result = true;
    }
    return result;
  }

  isAnUrlToLoad(characters: string): boolean {
    let result = false;
    if (this.isAnUrl(characters)) {
      if (characters.startsWith("https://www.youtube.com/watch?v=") || (characters.includes("https://www.youtube.com/embed/"))) {
        this.result = this.getYoutubeUrl(characters);
        result = true;
      }
      if (characters.startsWith("https://twitter.com/") && characters.includes("/status/") && (this.getSlashNumber(characters) === 5)) {
        this.result = this.getTwitterUrl(characters);
        result = true;
      }
      const reg = /https:\/\/www.instagram.com\/p\/[^\ ^\/]*/;
      const res = characters.match(reg);
      if (res != null && res.length > 0) {
        res[0] += "/embed/";
        result = true;
        this.result = res[0];
      }
    }
    return result;
  }

  getSlashNumber(str: string): number {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "/") {
        count++;
      }
    }
    return count;
  }

  getYoutubeUrl(myUrl: string): string {
    if (myUrl.includes("watch?v=")) {
      myUrl = myUrl.replace("watch?v=", "embed/");
    }
    return myUrl;
  }

  getTwitterUrl(myUrl: string): string {
    const id1 = myUrl.split("/")[3];
    const id2 = myUrl.split("/")[5];
    return "http://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2F" + id1 + "%2Fstatus%2F" + id2;
  }

  isAnImage(myUrl: string): boolean {
    const formats = ["JPEG", "JPEG2000", "GIF", "PNG", "TIFF", "SVG", "JPG"];
    let test = false;
    if (this.isAnUrl(myUrl)) {
      for (let i = 0; i < formats.length; i++) {
        if (myUrl.endsWith(formats[i]) || myUrl.endsWith(formats[i].toLowerCase())) {
          test = true;
          break;
        }
      }
    }
    return test;
  }

}
