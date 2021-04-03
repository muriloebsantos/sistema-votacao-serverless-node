import InserirEleicaoRequest from "../models/requests/inserirEleicaoRequest";
import ErrorResponse from "../models/responses/ErrorResponse";
import Eleicao from "../models/tables/eleicao";
import EleicaoRepository from '../repositories/eleicaoRepository';

export default class InserirEleicaoService {

    private eleicaoRepository: EleicaoRepository;

    constructor() {
        this.eleicaoRepository = new EleicaoRepository();
    }

    public async inserirEleicao(inserirEleicaoRequest: InserirEleicaoRequest):  Promise<Eleicao | ErrorResponse> {
        const erro = this.obterErroValidacao(inserirEleicaoRequest);

        if(erro) {
            return {
                status: 400,
                error: erro
            }
        }

        const eleicaoExistente = await this.eleicaoRepository.obterEleicao(inserirEleicaoRequest.id);

        if(eleicaoExistente) {
            return {
                status: 409,
                error: "Já existe uma eleição com esse código"
            }
        }

        const eleicao: Eleicao = {
            id: inserirEleicaoRequest.id,
            nome: inserirEleicaoRequest.nome,
            descricao: inserirEleicaoRequest.descricao,
            dataInclusao: new Date().toISOString()
        };

        await this.eleicaoRepository.inserirEleicao(eleicao);

        return eleicao;
    }

    public obterErroValidacao(inserirEleicaoRequest: InserirEleicaoRequest): string {
        if(!inserirEleicaoRequest.id) {
            return "Código da eleição é obrigatório";
        }

        if(!inserirEleicaoRequest.nome) {
            return "Nome da eleição é obrigatório";
        }

        if(inserirEleicaoRequest.id.length > 15) {
            return "O código da eleição deve possuir no máximo 15 carateres";
        }

        if(inserirEleicaoRequest.nome.length > 50) {
            return "O nome da eleição deve possuir no máximo 50 carateres";
        }

        if(inserirEleicaoRequest.descricao?.length > 100) {
            return "A descrição da eleição deve possuir no máximo 100 carateres";
        }

        return null;
    }
}