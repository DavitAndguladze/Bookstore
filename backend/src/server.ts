import env from "./config/env";
import app from "./app";
import "./config/nyt.cron";

app.listen(env.PORT, () => {
  console.log(`Server is running on Port: ${env.PORT}`);
});
