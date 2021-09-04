import mongoose from 'mongoose';

export default mongoose
  .connect(`mongodb://localhost:${process.env.MONGO_PORT}/epps_apps`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to mongo.');
  })
  .catch(e => {
    console.error('Connection to mongo failed...', e);
  });
