import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    PostagemModule,
  TemaModule, // Importa o módulo Tema para registrar suas rotas e serviços
  AuthModule, // Importa o módulo Auth para gerenciar autenticação e segurança
  UsuarioModule, // Importa o módulo Usuario para gerenciar usuários
  ],
  // Controllers globais (nenhum declarado aqui)
  controllers: [AppController],
  // Providers globais (nenhum declarado aqui)
  providers: [],
})
export class AppModule { }
