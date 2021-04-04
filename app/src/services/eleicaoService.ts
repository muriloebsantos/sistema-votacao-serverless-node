import NovaEleicaoRequest from "../models/requests/novaEleicaoRequest";
import ErrorResponse from "../models/responses/ErrorResponse";
import Eleicao from "../models/tables/eleicao";
import EleicaoRepository from '../repositories/eleicaoRepository';

export default class EleicaoService {

    private eleicaoRepository: EleicaoRepository;

    constructor() {
        this.eleicaoRepository = new EleicaoRepository();
    }

    public async inserirEleicao(novaEleicaoRequest: NovaEleicaoRequest):  Promise<Eleicao | ErrorResponse> {
        const erro = this.validarInclusao(novaEleicaoRequest);

        if(erro) {
            return {
                status: 400,
                error: erro
            }
        }

        const eleicaoExistente = await this.eleicaoRepository.obterEleicao(novaEleicaoRequest.id);

        if(eleicaoExistente) {
            return {
                status: 409,
                error: "Já existe uma eleição com esse código"
            }
        }

        const eleicao: Eleicao = {
            id: novaEleicaoRequest.id,
            nome: novaEleicaoRequest.nome,
            descricao: novaEleicaoRequest.descricao,
            dataInclusao: new Date().toISOString()
        };

        await this.eleicaoRepository.inserirEleicao(eleicao);

        return eleicao;
    }

    private validarInclusao(inserirEleicaoRequest: NovaEleicaoRequest): string {
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