export class Service {

  constructor(id: number) {
    this.id = id;
    switch (id) {
      case 1:
        this.name = 'Telefonía Móvil';
        break;
      case 2:
        this.name = 'Cable';
        break;
      case 3:
        this.name = 'Internet';
        break;
      case 4:
        this.name = 'Telefonía Fija';
        break;
    }
  }

  id: number;
  name: string
}
