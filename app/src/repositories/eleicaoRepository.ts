import Eleicao from "../models/tables/eleicao";
import { DynamoDB } from "aws-sdk";

const table = "sv_eleicao";

export default class EleicaoRepository {

    public async inserirEleicao(eleicao: Eleicao) {
        const docClient = new DynamoDB.DocumentClient();
        const params = {
            TableName: table,
            Item: eleicao
        };

       await docClient.put(params).promise();
    }

    public async obterEleicao(id: string) : Promise<Eleicao> {
        const docClient = new DynamoDB.DocumentClient();
        const params = {
            TableName: table,
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames:{
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": id
            }
        };

        const result = await docClient.query(params).promise();

        if(result.Items?.length > 0) {
            return result.Items[0] as Eleicao;
        }

        return null;
    }
}