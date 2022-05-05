import * as express from "express";
import * as path from "path";
import routes from './routes';
import { configurePassport } from "./middleware/passport-strategies.mw";

const app = express();
const port = process.env.PORT || 4001;

// Middleware
configurePassport(app);
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

app.get("*", function (req: express.Request, res: express.Response) {
  res.sendFile(path.join(__dirname, "../public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
