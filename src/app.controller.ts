// Importa os decorators do NestJS para criar controllers e rotas HTTP
import { Controller, Get } from '@nestjs/common';
// Importa o serviço que contém a lógica de negócio
import { AppService } from './app.service';

// Define essa classe como um controller para a rota raiz ("/")
@Controller()
export class AppController {
  // Injeta o serviço AppService para usar seus métodos dentro do controller
  constructor(private readonly appService: AppService) {}

  // Define um método que responde a requisições GET na rota "/"
  @Get()
  getHello(): string {
    // Chama o método getHello do AppService e retorna sua resposta
    return this.appService.getHello();
  }
}
