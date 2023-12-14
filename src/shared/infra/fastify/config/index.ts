import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { v1Routes } from "@shared/infra/fastify/routers/v1.router";
import Fastify from "fastify";
import { withRefResolver } from "fastify-zod";
import fs from "fs";
import * as path from "path";

const port: number = Number(process.env["PORT"] || 3030);

const envToLogger = {
  development: {
    transport: {
      options: {
        ignore: "pid,hostname",
        translateTime: "HH:MM:ss Z",
      },
      target: "pino-pretty",
    },
  },
  production: true,
  test: true,
};

export const fastServer = Fastify({
  ajv: {
    customOptions: {
      keywords: ["example"],
      strict: "log",
    },
  },
  logger: envToLogger[process.env["NODE_ENV"]],
});

export async function launchFastServer(): Promise<void> {
  for (const schema of []) {
    fastServer.addSchema(schema);
  }

  fastServer.register(
    swagger,
    withRefResolver({
      mode: "dynamic",
      openapi: {
        info: {
          description: "",
          title: "",
          version: "1.0.0",
        },
        servers: [
          {
            description: "Localhost",
            url: "http://localhost:3030",
          },
        ],
        tags: [],
      },
    }),
  );

  fastServer.register(swaggerUI, {
    routePrefix: "/docs",
    staticCSP: true,
  });

  fastServer.register(v1Routes, { prefix: "/api/v1" });

  await fastServer.listen({
    host: "0.0.0.0",
    port: port,
  });

  const responseYaml = await fastServer.inject("/docs/yaml");
  fs.writeFileSync(
    path.join(__dirname, "../../../../docs/openapi.yaml"),
    responseYaml.body,
  );
}
