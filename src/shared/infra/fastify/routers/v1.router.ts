import { FastifyInstance } from "fastify";

declare module "fastify" {
  export interface FastifyRequest {}
}

export const v1Routes = async (fastify: FastifyInstance): Promise<void> => {};
