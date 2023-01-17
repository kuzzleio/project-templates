import { ExampleApplication } from './lib/ExampleApplication';

/**
 * Start the application
 */
const app = new ExampleApplication();

app
  .start()
  .then(async () => {
    app.log.info('Application started');
  })
  .catch(console.error);

