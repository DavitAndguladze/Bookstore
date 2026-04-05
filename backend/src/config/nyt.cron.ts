import cron from "node-cron";
import { syncNytList } from "../modules/nyt/nyt.service";

cron.schedule("0 0 * * 0", async () => {
    await syncNytList("hardcover-fiction")
    await syncNytList("paperback-nonfiction")
    await syncNytList("young-adult-hardcover")
})