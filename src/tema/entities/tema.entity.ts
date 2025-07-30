// Importa o decorador que garante que o campo não pode ser vazio
import { IsNotEmpty } from "class-validator";

// Importa os decoradores do TypeORM para definir colunas e a entidade
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

// Define que essa classe será uma entidade (tabela) do banco de dados com o nome "tb_temas"
@Entity({ name: "tb_temas" })
export class Tema {

    // Define a coluna "id" como chave primária e com valor gerado automaticamente (auto incremento)
    @PrimaryGeneratedColumn()
    id: number;

    // Garante que o campo "descricao" não pode ser vazio nas validações
    @IsNotEmpty()

    // Define a coluna "descricao" com no máximo 255 caracteres e que não pode ser nula no banco
    @Column({ length: 255, nullable: false })
    descricao: string;
    postagens: any;

    @OneToMany(()=> Postagem, (postagem) => postagem.tema)
    postagem: Postagem[];

}
