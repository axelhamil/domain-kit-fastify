import "dotenv/config";
import "./shared/infra/initialiseEventsListeners";

import { fastServer, launchFastServer } from "@shared/infra/fastify/config";

launchFastServer()
  .then(() => fastServer.log.info(`Server is ready!`))
  .catch((error) => console.error(error));

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, async () => {
    await fastServer.close();
    // noinspection TypeScriptValidateJSTypes
    process.exit(0);
  });
});
