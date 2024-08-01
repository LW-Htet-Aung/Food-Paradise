const Queue = require("bull");
const sentEmail = require("../helpers/sentEmail");
const emailQueue = new Queue("email transcoding", {
  redis: { port: 6379, host: "127.0.0.1" },
});
emailQueue.process(async (job, done) => {
  await sentEmail(job.data);

  job.progress(42);

  done();
});
module.exports = emailQueue;
