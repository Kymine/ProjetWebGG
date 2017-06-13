/**
 * Classe représentant object Message
 * Cet objet est renvoyé grâce à l'url /threads/:id/messages avec :id un nombre entier représentant l'id d'un Channel
 */
export class PrivateMessageModel {

  /**
   * Identifiant du message.
   */
  public id: number;

  /**
   * Contenu du message
   */
  public content: string;

  /**
   * Nom de la personne ayant envoyé le message
   */
  public from: string;

  /**
   * Date de création du message.
   */
  public createdAt: string;

  /**
   * Date de la mise à jour du message. Si le message n'a pas été mis à jour, par défaut la valeur sera la identique
   * à createdAt.
   */
  public updatedAt: string;

  /**
   * Identifiant de la thread
   */
  public userId: string;

  constructor(id?: number, content?: string, from?: string, createdAt?: string, updatedAt?: string, userId?: string) {
    this.id = id;
    this.content = content;
    this.from = from;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userId = userId;
  }
}
