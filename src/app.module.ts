// Importa o decorator Module do NestJS para definir módulos
import { Module } from '@nestjs/common';
// Importa o módulo TypeOrmModule para integrar TypeORM com NestJS
import { TypeOrmModule } from '@nestjs/typeorm';
// Importa a entidade Postagem para registrar no TypeORM
import { Postagem } from './postagem/entities/postagem.entity';
// Importa o módulo que cuida das funcionalidades relacionadas à Postagem
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';

@Module({
  // Configurações dos módulos que serão carregados na aplicação
  imports: [
    // Configura o TypeORM para conectar com o banco MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',          // Tipo do banco de dados
      host: 'localhost',      // Endereço do servidor do banco
      port: 3306,             // Porta do banco MySQL padrão
      username: 'root',       // Usuário do banco
      password: '8486',       // Senha do banco (cuidado com exposição!)
      database: 'db_blogpessoal',  // Nome do banco de dados a ser usado
      entities: [Postagem, Tema, Usuario],   // Entidades que o TypeORM deve gerenciar
      synchronize: true,      // Sincroniza o esquema do banco automaticamente (bom para dev)
    }),
    // Importa o módulo Postagem para registrar suas rotas e serviços
    PostagemModule, 
    TemaModule, // Importa o módulo Tema para registrar suas rotas e serviços
    AuthModule, // Importa o módulo Auth para gerenciar autenticação e segurança
    UsuarioModule, // Importa o módulo Usuario para gerenciar usuários
  ],
  // Controllers globais (nenhum declarado aqui)
  controllers: [],
  // Providers globais (nenhum declarado aqui)
  providers: [],
})
export class AppModule {}
