import type { IncomingMessage, ServerResponse } from "http";
import bodyParse from "./bodyParse";
import queryParse from "./queryParse";

export default class RequestHandler<
  QueryParams = Record<string, any>,
  DataParams = Record<string, any>
> {
  req: IncomingMessage;
  onDataCallback: (chunk: string, body: string) => void = () => {};
  onEndCallback: (
    params: { query: QueryParams; data: DataParams },
    body: string
  ) => void = () => {};
  errorHandler: (error: any) => void = () => {};

  constructor(req: IncomingMessage) {
    this.req = req;
  }

  onData(callback: () => void) {
    this.onDataCallback = callback;
    return this;
  }

  onEnd(callback: () => void) {
    this.onEndCallback = callback;
    return this;
  }

  handle(
    callback: (parameters: { query: QueryParams; data: DataParams }) => void
  ) {
    let body = "";
    this.req.on("data", (chunk) => {
      try {
        body += chunk;
        this.onDataCallback(chunk, body);
      } catch (error) {
        this.errorHandler(error);
      }
    });
    this.req.on("end", () => {
      try {
        const parameters = {
          query: queryParse<QueryParams>(this.req.url),
          data: bodyParse<DataParams>(body),
        };
        this.onEndCallback(parameters, body);
        callback(parameters);
      } catch (error) {
        this.errorHandler(error);
      }
    });
    return this;
  }

  catch(errorHandler: (error: any) => void) {
    this.errorHandler = errorHandler;
    return this;
  }
}
