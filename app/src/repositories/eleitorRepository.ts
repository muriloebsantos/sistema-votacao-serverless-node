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
}