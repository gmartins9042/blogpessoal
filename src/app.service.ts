// Importa o decorator Injectable do NestJS, que permite que essa classe seja injetada como uma dependência em outros lugares
import { Injectable } from '@nestjs/common';

// O decorator @Injectable() informa ao NestJS que essa classe pode ser usada para **injeção de dependência**
@Injectable()
export class AppService {

  // Método público chamado `getHello`, que retorna uma string "Hello World!"
  // Pode ser chamado por um controller, por exemplo, para responder a uma requisição HTTP
  getHello(): string {
    return 'Hello World!';
  }
}
