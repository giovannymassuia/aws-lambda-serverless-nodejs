import { APIGatewayProxyHandler } from "aws-lambda";
import GetNotes from "../../core/usecase/getNotes";
import InMemoryDayRepository from "../../infra/repository/InMemoryDayRepository";
import { middyfy } from "@libs/lambda";

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  console.log("event", event);
  console.log("context", event.requestContext.authorizer?.claims);

  const getNotesUseCase = new GetNotes(new InMemoryDayRepository());

  const notes = getNotesUseCase.execute("2");

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: notes,
    }),
  };
};

export const main = middyfy(handler);
