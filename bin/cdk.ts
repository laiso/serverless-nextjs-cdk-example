import * as cdk from "@aws-cdk/core";
import { Builder } from "@sls-next/lambda-at-edge";
import { SlsNextStack } from "../lib/sls-next-stack";

// Run the serverless builder, this could be done elsewhere in your workflow
const builder = new Builder(".", "./build", { args: ["build"] });

builder
  .build()
  .then(() => {
    const app = new cdk.App();
    new SlsNextStack(app, `SlsNextStack`, {});
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });