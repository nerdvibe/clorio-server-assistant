import { CronJob } from "cron";
import { setHeight } from "@modules/nodeStat";

export const heightCron = new CronJob("*/30 * * * * *", async () => {
  await setHeight();
});
