import { APIGatewayProxyHandler } from "aws-lambda";
import AddNote from "../../core/usecase/addNote";
import InMemoryDayRepository from "../../infra/repository/InMemoryDayRepository";
import GetNotes from "../../core/usecase/getNotes";
import { middyfy } from "@libs/lambda";

type InputRequest = {
  note: string;
};

const repo = new InMemoryDayRepository();

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  console.log("event", event);

  const addNoteUseCase = new AddNote(repo);
  const getNotesUseCase = new GetNotes(repo);

  const input: InputRequest = JSON.parse(JSON.stringify(event.body!));

  addNoteUseCase.execute(event.pathParameters?.dayId!, input.note);

  const notes = getNotesUseCase.execute(event.pathParameters?.dayId!);

  return {
    statusCode: 201,
    body: JSON.stringify(notes),
  };
};

export const main = middyfy(handler);
