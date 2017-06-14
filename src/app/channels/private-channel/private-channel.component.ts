import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-private-channel",
  templateUrl: "./private-channel.component.html",
  styleUrls: ["./private-channel.component.css"]
})

export class PrivateChannelComponent implements OnInit {

  constructor() {
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
  }

}
