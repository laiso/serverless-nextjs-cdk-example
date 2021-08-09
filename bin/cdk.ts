import * as cdk from "@aws-cdk/core";
import { Builder } from "@sls-next/lambda-at-edge";
import { SlsNextStack } from "../lib/sls-next-stack";

import * as myPackage from "../package.json"

// Run the serverless builder, this could be done elsewhere in your workflow
const builder = new Builder(".", "./build", { args: ["build"] });

builder
  .build()
  .then(() => {
    const app = new cdk.App();
    new SlsNextStack(app, myPackage.name, {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: 'us-east-1'
      }
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });