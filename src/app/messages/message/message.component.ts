import {Component, Input, OnInit, Pipe, PipeTransform} from "@angular/core";
import {MessageModel} from "../../../shared/models/MessageModel";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})

@Pipe({ name: "safe" })
export class MessageComponent implements OnInit, PipeTransform {

  @Input() message: MessageModel;
  url: SafeResourceUrl;
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  constructor(public sanitizer: DomSanitizer) {
    this.message = new MessageModel(0, "Hello!");
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
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.message.content);
  }
  isAnUrl(): boolean {
    let result = false;
    if (this.message.content.includes("http://") || this.message.content.includes("https://")) {
      result = true;
    }
    console.log("result = " + result + " message = " + this.message.content);
    return result;
  }
  get(): SafeResourceUrl {
    return this.url;
  }
}
