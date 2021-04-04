import NovoEleitorRequest from "../models/requests/novoEleitorRequest";
import ErrorResponse from "../models/responses/ErrorResponse";
import Eleitor from "../models/tables/eleitor";
import EleicaoRepository from "../repositories/eleicaoRepository";
import EleitorRepository from "../repositories/eleitorRepository";

export default class EleitorService {
    private eleitorRepository: EleitorRepository;
    private eleicaoRepository: EleicaoRepository;

    constructor() {
        this.eleitorRepository = new EleitorRepository();
        this.eleicaoRepository = new EleicaoRepository();
    }

    public async inserirEleitor(novoEleitorRequest: NovoEleitorRequest): Promise<Eleitor | ErrorResponse>  {
        const erro = this.validarInclusao(novoEleitorRequest);

        if(erro) {
            return {
                status: 400,
                error: erro
            }
        }

        const eleicao = await this.eleicaoRepository.obterEleicao(novoEleitorRequest.eleicaoId);

        if(!eleicao) {
            return {
                status: 422,
                error: `Eleição "${novoEleitorRequest.eleicaoId}" não existe`
            }
        }

        const eleitor: Eleitor = {
            id: novoEleitorRequest.id,
            eleicaoId: novoEleitorRequest.eleicaoId,
            dataInclusao: new Date().toISOString()
        };

        await this.eleitorRepository.inserirEleitor(eleitor);

        return eleitor;
    }

    private validarInclusao(novoEleitorRequest: NovoEleitorRequest) : string {
        if(!novoEleitorRequest.id) {
            return "Código do Eleitor é obrigatório";
        }

        if(!novoEleitorRequest.eleicaoId) {
            return "Código da  Eleição é obrigatório";
        }

        if(novoEleitorRequest.id.length > 40) {
            return "O código do eleitor deve possuir no máximo 40 carateres";
        }

        if(novoEleitorRequest.eleicaoId.length > 15) {
            return "O código da eleição deve possuir no máximo 15 carateres";
        }

        return null;
    }
}