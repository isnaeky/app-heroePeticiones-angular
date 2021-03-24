export class HeroeModel {
  id: string | undefined;
  nombre: string;
  poder: string;
  vivo: boolean;

  constructor() {
    this.nombre = '';
    this.poder = '';
    this.vivo = true;
  }
}
