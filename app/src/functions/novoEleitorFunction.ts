import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import NovoEleitorRequest from "../models/requests/novoEleitorRequest";
import EleitorService from "../services/eleitorService";
  
import { defaultResult } from "./index"
  
  export const lambdaHandler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const novoEleitorRequest = JSON.parse(event.body) as NovoEleitorRequest;
    novoEleitorRequest.eleicaoId = event.pathParameters["eleicaoId"];
    const eleitorService = new EleitorService();
    const resultado = await eleitorService.inserirEleitor(novoEleitorRequest);
    return defaultResult(201, resultado);
  }