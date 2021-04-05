import { DynamoDB } from "aws-sdk";
import Eleitor from "../models/tables/eleitor";

const table = "sv_eleitor";

export default class EleitorRepository {

    public async inserirEleitor(eleitor: Eleitor) {
        const docClient = new DynamoDB.DocumentClient();
        const params = {
            TableName: table,
            Item: eleitor
        };

       await docClient.put(params).promise();
    }

    public async obterEleitor(id: string, eleicaoId: string) : Promise<Eleitor> {
        const docClient = new DynamoDB.DocumentClient();
        const params = {
            TableName: table,
            KeyConditionExpression: "#eleicaoId = :eleicaoId and #id = :id",
        
            ExpressionAttributeNames:{
                "#eleicaoId": "eleicaoId",
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":eleicaoId": eleicaoId,
                ":id": id
            }
        };

        const result = await docClient.query(params).promise();

        if(result.Items?.length > 0) {
            return result.Items[0] as Eleitor;
        }

        return null;
    }
}