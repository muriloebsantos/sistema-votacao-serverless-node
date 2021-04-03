import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
  
import InserirEleicaoService from "../services/inserirEleicaoService";
import { defaultResult } from "./index"
  
  export const lambdaHandler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    
    const eleicaoRequest = JSON.parse(event.body);
    const inserirEleicaoService = new InserirEleicaoService();
    const resultado = await inserirEleicaoService.inserirEleicao(eleicaoRequest);

    return defaultResult(201, resultado);
  }