import express from 'express';
import { Request, Response } from 'express';
const app = express();
const port = 3000;

app.get('/health', (req: Request, res: Response) => {
  res.send(
    'Hello World!, Health check done. Everything is working as expected!'
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
