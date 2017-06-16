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
      tmp = new Array();
      let j = "";
      for (let i = 0; i < this.stringList.length; i++) {
        if (this.isAnUrl(this.stringList[i])) {
          if (j.length > 0) {
            tmp.push(j);
          }
          j = "";
          tmp.push(this.stringList[i]);
        }
        if (this.notUrl(this.stringList[i])) {
          j += this.stringList[i] + " ";
        }
      }
      if (tmp.length === 0) {
        tmp.push(j);
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
    if (characters.includes("http://") || characters.includes("https://")) {
      if (characters.startsWith("https://www.youtube.com/watch?v=") || (characters.includes("https://www.youtube.com/embed/"))) {
        this.result = this.getYoutubeUrl(characters);
        result = true;
      }
      if (characters.includes("twitter")) {
        this.result = this.getTwitterUrl(characters);
        result = true;
      }
      const reg = /https:\/\/www.instagram.com\/p\/[^\ ^\/]*/;
      const res = this.message.content.match(reg);
      if (res != null && res.length > 0) {
        res[0] += "/embed/";
        result = true;
        this.result = res[0];
      }
    }
    return result;
  }

  getUrl(myUrl: string, toReplace: string, word): string {
    if (myUrl.includes(toReplace)) {
      myUrl = myUrl.replace(toReplace, word);
    }
    return myUrl;
  }

  getYoutubeUrl(myUrl: string): string {
    return this.getUrl(myUrl, "watch?v=", "embed/");
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
