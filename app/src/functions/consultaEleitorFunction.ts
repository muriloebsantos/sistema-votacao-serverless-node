import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
import EleitorService from "../services/eleitorService";
  
import { defaultResult } from "./index"
  
  export const lambdaHandler = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    
    const eleicaoId = event.pathParameters["eleicaoId"];
    const eleitorId = event.pathParameters["id"];
    const eleitorService = new EleitorService();
    const resultado = await eleitorService.obterEleitor(eleicaoId, eleitorId);
    return defaultResult(200, resultado);
  }