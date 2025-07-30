// Importa o decorator Module do NestJS para definir um módulo
import { Module } from "@nestjs/common";
// Importa o módulo do TypeORM para integrar o ORM ao NestJS
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaModule } from "../tema/tema.module";
// Importa a entidade Postagem para registrar no TypeORM
import { Postagem } from "./entities/postagem.entity";
// Importa o controller que lida com as rotas relacionadas a Postagem
import { PostagemController } from "./controllers/postagem.controller";
// Importa o serviço que contém a lógica de negócio para Postagem
import { PostagemService } from "./services/postagem.service";

@Module({
    // Registra a entidade Postagem no TypeORM para que possa ser injetada via repositório
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    
    // Declara que o PostagemService estará disponível para injeção dentro deste módulo
    providers: [PostagemService],
    
    // Registra o PostagemController para lidar com as requisições HTTP deste módulo
    controllers: [PostagemController],
    
    // Exports fica vazio porque não estamos exportando nada para outros módulos
    exports: [TypeOrmModule]
})
export class PostagemModule { }
