import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import { addNoteFunction, getNotesFunction } from "@functions/notes";

const serverlessConfiguration: AWS = {
  service: "aws-lambda-serverless-nodejs",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  resources: {
    Resources: {
      CognitoAuthorizer: {
        Type: "AWS::ApiGateway::Authorizer",
        Properties: {
          Name: "cognitoAuthorizer",
          Type: "COGNITO_USER_POOLS",
          ProviderARNs: [
            "arn:aws:cognito-idp:us-east-1:xxxx:userpool/<user-pool-id>",
          ],
          IdentitySource: "method.request.header.Authorization",
          RestApiId: {
            Ref: "ApiGatewayRestApi",
          },
        },
      },
    },
  },
  outputs: {
    CognitoAuthorizer: {
      Value: {
        Ref: "CognitoAuthorizer",
      },
    },
  },
  // import the function via paths
  functions: { hello, getNotesFunction, addNoteFunction },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
