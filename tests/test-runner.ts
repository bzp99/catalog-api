import { setup, teardown } from "./setup.spec";

(async () => {
  await setup();

  try {
    await require("./health.spec");
    await require("./participants.spec");
  } catch (error) {
    console.error(error);
  } finally {
    await teardown();
  }
})();
