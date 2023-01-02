import { handlerPath } from "@libs/handler-resolver";
import type { AWS } from "@serverless/typescript";

type functionType = AWS["functions"][0];

export const getNotesFunction: functionType = {
  handler: `${handlerPath(__dirname)}/getNotesHandler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "notes",
        authorizer: {
          type: "COGNITO_USER_POOLS",
          authorizerId: {
            Ref: "CognitoAuthorizer",
          },
          scopes: [
            "aws.cognito.signin.user.admin",
            "phone",
            "openid",
            "profile",
            "email",
          ],
        },
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
