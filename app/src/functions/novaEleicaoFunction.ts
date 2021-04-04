import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import EleicaoService from "../services/eleicaoService";
  
import { defaultResult } from "./index"
  
  export const lambdaHandler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    
    const novaEleicaoRequest = JSON.parse(event.body);
    const eleicaoService = new EleicaoService();
    const resultado = await eleicaoService.inserirEleicao(novaEleicaoRequest);

    return defaultResult(201, resultado);
  }