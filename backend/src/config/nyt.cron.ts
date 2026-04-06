import cron from "node-cron";
import { syncNytList } from "../modules/nyt/nyt.service";

cron.schedule("0 0 * * 0", async () => {
    console.log("NYT sync started:", new Date().toISOString())

    const lists = [
        "hardcover-fiction",
        "combined-print-and-e-book-fiction",
        "audio-fiction",
        "hardcover-nonfiction",
        "combined-print-and-e-book-nonfiction",
        "audio-nonfiction",
        "young-adult-hardcover"
    ]   
    
    for (const list of lists) {
        try {
            await syncNytList(list)
            console.log(`Synced ${list}`)
        } catch (error) {
            console.error(`Failed to sync ${list}:`, error)
        }
        await new Promise(resolve => setTimeout(resolve, 7000))
    }

    console.log("NYT sync complete:", new Date().toISOString())
})