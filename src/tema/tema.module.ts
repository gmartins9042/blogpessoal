import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tema } from './entities/tema.entity';
import { TemaController } from './controllers/tema.controller';
import { TemaService } from './service/tema.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tema])],
  controllers: [TemaController],  // Adicione o controller aqui se já tiver
  providers: [TemaService],    // Adicione o service aqui se já tiver
  exports: [TemaService] // Exportando o service para ser usado em outros módulos
})
export class TemaModule {}
