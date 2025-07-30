// Importa os decoradores e utilitários do NestJS necessários para manipular rotas HTTP
import {
  Body,            // Extrai o corpo (body) da requisição
  Controller,      // Define a classe como um controller
  Delete,         // Define métodos DELETE (remoção de recursos)
  Get,             // Define métodos GET (buscas)
  HttpCode,        // Permite definir manualmente o código de status HTTP
  HttpStatus,      // Enum com os status HTTP (ex: 200, 201, 404)
  Param,           // Extrai parâmetros da URL
  ParseIntPipe,    // Converte parâmetros para número (usado com ID)
  Post,            // Define métodos POST (criação de recursos)
  Put              // Define métodos PUT (atualização de recursos)
} from '@nestjs/common';

// Importa o serviço que contém a lógica de negócio das postagens
import { PostagemService } from '../services/postagem.service';
// Importa a entidade (modelo de dados) Postagem
import { Postagem } from '../entities/postagem.entity';

// Define o prefixo das rotas deste controller como "/postagens"
// Ou seja, todas as rotas começam com /postagens
@Controller('/postagens')
export class PostagemController {

  // Injeta o PostagemService na classe para que seus métodos possam ser usados
  constructor(private readonly PostagemService: PostagemService) {}

  // Rota GET /postagens
  // Retorna todas as postagens do banco de dados
  @Get()
  @HttpCode(HttpStatus.OK) // Retorna status 200
  findAll(): Promise<Postagem[]> {
    return this.PostagemService.findAll(); // Chama o método do serviço para buscar todas as postagens
  }

  // Rota GET /postagens/:id
  // Retorna uma postagem específica com base no ID passado na URL
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    // Extrai o parâmetro "id" da URL e converte para número com ParseIntPipe
    return this.PostagemService.findById(id); // Chama o método do serviço para buscar a postagem pelo ID
  }

  // Rota GET /postagens/titulo/:titulo
  // Retorna todas as postagens que contenham o texto informado no "titulo"
  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.PostagemService.findAllbyTitulo(titulo); // Busca por título no serviço
  }

  // Rota POST /postagens
  // Cria uma nova postagem com os dados enviados no corpo da requisição
  @Post()
  @HttpCode(HttpStatus.CREATED) // Retorna status 201 (Created)
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.PostagemService.create(postagem); // Envia a postagem para ser salva
  }

  // Rota PUT /postagens
  // Atualiza uma postagem existente com os dados enviados no corpo da requisição
  @Put()
  @HttpCode(HttpStatus.OK) // Retorna status 200
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.PostagemService.update(postagem); // Chama o serviço para atualizar a postagem
  }

  // Define que esse método será chamado quando uma requisição DELETE for feita na rota /:id
@Delete('/:id')

// Define o código HTTP de resposta como 204 (No Content), ou seja, sem corpo de resposta
@HttpCode(HttpStatus.NO_CONTENT)

// Define o método delete que recebe o parâmetro 'id' da rota
delete(
  // Extrai o parâmetro 'id' da URL e o converte para número com ParseIntPipe
  @Param('id', ParseIntPipe) id: number
) {
  // Chama o serviço postagemService e executa o método delete, passando o id como argumento
  return this.PostagemService.delete(id);
}

}
