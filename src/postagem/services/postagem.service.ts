// Importa decorators e classes do NestJS e TypeORM para manipulação de banco e tratamento de erros
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TemaService } from "../../tema/service/tema.service";

// Define a classe como um serviço injetável (pode ser usado via injeção de dependência)
@Injectable()
export class PostagemService {

    // Injeta o repositório do TypeORM para a entidade Postagem
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService
    ) { }

    // Busca todas as postagens no banco de dados
    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations: {
                tema: true // Inclui a relação com o tema
            }
        });
    }

    // Busca uma postagem pelo ID
    async findById(id: number): Promise<Postagem> {
        // Busca uma postagem específica pelo ID
        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations: {
                tema: true
            }
        });

        // Se não encontrar, lança uma exceção HTTP 404 (Not Found)
        if (!postagem) {
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
        }
        // Retorna a postagem encontrada
        return postagem;
    }

    // Busca todas as postagens cujo título contenha a string informada (case insensitive)
    async findAllbyTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                // ILike faz comparação "LIKE" ignorando maiúsculas/minúsculas
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                tema: true // Inclui a relação com o tema
            }
        });
    }

    // Cria uma nova postagem no banco de dados
    async create(postagem: Postagem): Promise<Postagem> {

        await this.temaService.findById(postagem.tema.id);
        // O método save insere ou atualiza o registro, dependendo se o ID existe
        return await this.postagemRepository.save(postagem);
    }

    // Atualiza uma postagem existente
    async update(postagem: Postagem): Promise<Postagem> {
        // Primeiro verifica se a postagem com o ID existe (para evitar criar novo registro)
        await this.findById(postagem.id)

        await this.temaService.findById(postagem.tema.id)
        // Se existir, atualiza a postagem com os novos dados

        // Atualiza a postagem no banco (save atualiza se já existir o ID)
        return await this.postagemRepository.save(postagem);
    }
    // Método assíncrono chamado "delete" que recebe um ID como parâmetro.
    // Ele retorna uma Promise com o resultado da exclusão (DeleteResult é um tipo do TypeORM).
    async delete(id: number): Promise<DeleteResult> {

        // Primeiro, ele chama um método "findById" para verificar se o item com o ID existe.
        // Isso é importante para evitar tentar deletar algo que não existe,
        // e provavelmente lança um erro caso não encontre a postagem.
        await this.findById(id);

        // Se o item existir, então ele chama o método "delete" do repositório
        // para remover o registro do banco de dados com base no ID.
        // O resultado da operação (por exemplo, quantos registros foram afetados) será retornado.
        return await this.postagemRepository.delete(id);
    }

}
