import {Component, Input, OnInit} from "@angular/core";

import {MessageModel} from "../../../shared/models/MessageModel";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})

/**
 * Message qui stocke le contenu du message et son auteur
 * Analyse le contenu du message et fais des operations sur les url pour l'affichage
 */
export class MessageComponent implements OnInit {

  @Input() message: MessageModel;

  stringList: string[];
  result: string;

  constructor() {
    this.message = new MessageModel(0, "");
  }

  /**
   * initialisation
   * filtre et transforme le message en un tableau qui contient en conservant l'ordre du message
   * soit une url soit le texte qui n'est pas une url
   * si plusieurs mots qui ne sont pas des urls sont cote a cote separes par des espaces, ils sont regoupes dans
   * les meme cases
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
  /**
   * @param characters un mot quelconque
   * @return boolean ie true si ce mot est n'est pas une url, false sinon
   */
  notUrl(characters: string): boolean {
    return !this.isAnUrl(characters);
  }
  /**
   * @param characters un mot quelconque
   * @return boolean ie true si ce mot est est pas une url, false sinon
   */
  isAnUrl(characters: string): boolean {
    let result = false;
    if (characters.startsWith("http://") || characters.startsWith("https://")) {
      result = true;
    }
    return result;
  }

  /**
   * informe si une url est chargeable dans un iframe pour nos modules
   * si l'url est valide elle est tranformee pour utiliser le pipe
   * @param characters un mot quelconque
   * @return boolean ie true si ce mot est une url qui va pouvoir etre charge dans une miniature youtube, instagram ou twitter, false sinon
   */
  isAnUrlToLoad(characters: string): boolean {
    let result = false;
    if (this.isAnUrl(characters)) {
      if (characters.startsWith("https://www.youtube.com/watch?v=") || (characters.includes("https://www.youtube.com/embed/"))) {
        this.result = this.getYoutubeUrl(characters);
        result = true;
      }
      if (characters.startsWith("https://twitter.com/") && characters.includes("/status/") && (this.getSlashNumber(characters) === 5)) {
        if (!characters.startsWith("https://twitter.com/status/")) {
          this.result = this.getTwitterUrl(characters);
          result = true;
        }
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
  /**
   * @param str un mot quelconque
   * @return number ie le nombre de / contenus dans le mot
   */
  getSlashNumber(str: string): number {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "/") {
        count++;
      }
    }
    return count;
  }
  /**
   * @param myUrl une url youtube valide de type string
   * @return string ie une url youtube lisible par le pipe et le html dans le frime
   */
  getYoutubeUrl(myUrl: string): string {
    if (myUrl.includes("watch?v=")) {
      myUrl = myUrl.replace("watch?v=", "embed/");
    }
    return myUrl;
  }
  /**
   * @param myUrl une url twitter valide de type string
   * @return string ie une url youtube lisible par le pipe et le html dans le frime
   */
  getTwitterUrl(myUrl: string): string {
    const id1 = myUrl.split("/")[3];
    const id2 = myUrl.split("/")[5];
    return "http://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2F" + id1 + "%2Fstatus%2F" + id2;
  }

  /**
   * @param myUrl une urlvalide de type string
   * @return boolean ie true si c'est une image, false sinon
   */
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
