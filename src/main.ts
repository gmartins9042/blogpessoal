// Importa a função NestFactory usada para criar uma instância da aplicação NestJS
import { NestFactory } from '@nestjs/core';
// Importa o módulo principal da aplicação (AppModule), onde tudo é centralizado
import { AppModule } from './app.module';
// Importa o ValidationPipe para aplicar validação automática nos dados recebidos
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Cria a aplicação NestJS com base no módulo principal
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Desenvolvedor Gabriel","https://www.linkedin.com/in/gabrielmartins-/","gmartins9042@gmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  
  // Define o fuso horário da aplicação como -03:00 (horário de Brasília, por exemplo)
  process.env.TZ = '-03:00'

  // Usa o ValidationPipe globalmente para validar automaticamente os dados dos DTOs (Data Transfer Objects)
  app.useGlobalPipes(new ValidationPipe());

  // Habilita o CORS (Cross-Origin Resource Sharing), permitindo que sua API seja acessada de outros domínios
  app.enableCors();

  // Inicia o servidor e escuta na porta definida na variável de ambiente PORT
  // Caso não exista a variável, usará a porta 4000 como padrão
  await app.listen(process.env.PORT ?? 4000);
}

// Executa a função bootstrap para iniciar a aplicação
bootstrap();
