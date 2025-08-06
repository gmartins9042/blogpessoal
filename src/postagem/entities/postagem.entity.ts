// Importa o decorator IsNotEmpty para validar que os campos não sejam vazios
import { IsNotEmpty } from "class-validator";
// Importa decorators do TypeORM para mapear a classe com uma tabela no banco de dados
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

// Define que essa classe é uma entidade e será mapeada para a tabela 'tb_postagens' no banco
@Entity({ name: 'tb_postagens' })
export class Postagem {

    // Define que a coluna 'id' é a chave primária e gerada automaticamente
    @PrimaryGeneratedColumn()
    id: number;

    // Validação: esse campo não pode estar vazio (usado com ValidationPipe no controller)
    @IsNotEmpty()
    // Mapeia o campo 'titulo' com até 100 caracteres e obrigatório (nullable: false)
    @Column({ length: 100, nullable: false })
    titulo: string;

    @IsNotEmpty()
    // Mapeia o campo 'texto' com até 1000 caracteres e obrigatório
    @Column({ length: 1000, nullable: false })
    texto: string;

    // Define que essa coluna será preenchida automaticamente com a data da última atualização
    @UpdateDateColumn()
    data: Date;

    @ManyToOne(() => Tema, (tema) => tema.postagens, {
        onDelete: 'CASCADE', // Se o tema for deletado, as postagens associadas também serão
    })
// Relaciona a postagem com um tema específico
     @JoinColumn({ name: 'tema_id' })
     tema: Tema;

     @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: 'CASCADE', // Se o usuário for deletado, as postagens associadas também serão
    })
// Relaciona a postagem com um usuário específico
     // Define que a coluna 'usuario_id' será usada para o relacionamento
     @JoinColumn({ name: 'usuario_id' })
     usuario: Usuario;
};


