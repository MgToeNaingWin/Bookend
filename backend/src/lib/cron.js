import cron from 'cron';
import https from 'https';

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) {
        console.log("GET API sent successfully");
      } else {
        console.log("API sending failed:", res.statusCode);
      }
    })
    .on("error", (e) => console.error("Error while sending:", e));
});

export default job;
