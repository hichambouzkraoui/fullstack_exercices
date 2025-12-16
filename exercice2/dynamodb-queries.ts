import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "survey";
const GSI_NAME = "GSI_SurveyDueDate";

// 1. Query all surveys due in the next 30 days for a specific company
export async function getDueSurveysInNext30Days(companyId: string, lastEvaluatedKey?: any) {
  const nowDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);
  
  const params = {
    TableName: TABLE_NAME,
    IndexName: GSI_NAME,
    KeyConditionExpression: "gsiPkSurvey = :companyId AND gsiSkDueDate BETWEEN :nowDate AND :dueDate",
    ExpressionAttributeValues: {
      ":companyId": companyId,
      ":nowDate": nowDate.toISOString(),
      ":dueDate": dueDate.toISOString()
    },
    Limit: 100,
    ExclusiveStartKey: lastEvaluatedKey
  };

  return await docClient.send(new QueryCommand(params));
}

// 2. Get all surveys for an asset, sorted by date (newest first)
export async function getAllSurveysForAsset(assetId: string, lastEvaluatedKey?: any) {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "pk = :assetId",
    ExpressionAttributeValues: {
      ":assetId": assetId
    },
    ScanIndexForward: false, // newest first
    Limit: 100,
    ExclusiveStartKey: lastEvaluatedKey
  };

  return await docClient.send(new QueryCommand(params));
}

// 3. Implement pagination for 100 items per page
export async function getAllItemsPaginated(queryFunction: (lastKey?: any) => Promise<any>) {
  const items = [];
  let lastKey;
  do {
    const result = await queryFunction(lastKey);
    items.push(...result.Items);
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);
  return items;
}