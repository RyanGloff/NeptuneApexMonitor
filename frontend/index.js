import express from 'express';

const app = express();
const port = 8081;

app.use('/static', express.static('frontend/public'));

app.listen(port, () => console.log(`Server started on port ${port}`));
