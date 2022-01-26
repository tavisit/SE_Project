import type { IncomingMessage, ServerResponse } from "http";
import RequestHandler from "../utils/requestParse/requestHandler";
import { register } from "../utils/firebaseLogic/auth";

export interface ExpectedPostParams {
  email: string;
  password: string;
}

export default (req: IncomingMessage, res: ServerResponse) => {
  new RequestHandler<null, ExpectedPostParams>(req)
    .handle(async (params) => {
      const { data } = params;
      const user = await register(data.email, data.password);
      if (user === null) {
        res.statusCode = 401;
        res.end(JSON.stringify(null));
      } else {
        res.end(JSON.stringify(user));
      }
    })
    .catch((error) => {
      res.statusCode = 500;
      res.statusMessage = "Error";
      res.end(JSON.stringify(null));
      console.log(error);
    });
};
