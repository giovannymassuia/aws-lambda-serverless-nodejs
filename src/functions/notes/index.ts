import { handlerPath } from "@libs/handler-resolver";

export const getNotesFunction = {
  handler: `${handlerPath(__dirname)}/getNotesHandler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "notes",
      },
    },
  ],
};

export const addNoteFunction = {
  handler: `${handlerPath(__dirname)}/addNoteHandler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "notes/{dayId}",
      },
    },
  ],
};
