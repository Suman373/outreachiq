const Agenda = require('agenda');
const { MONGODB_URI } = require('./index');

const agenda = new Agenda({
    db: { address: MONGODB_URI, collection: "agendajobs" },
    processEvery: "30 seconds",
    maxConcurrency: 20
});

(async () => {
    await agenda.start();
    console.log("Agenda started");
})();

module.exports = agenda;
