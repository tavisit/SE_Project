import type { IncomingMessage, ServerResponse } from 'http';
import { useCookie } from 'h3';
import * as path from 'path';
import * as fs from 'fs';

const extractUserID = (req: IncomingMessage): string | null => {
  try {
    const cookie = JSON.parse(useCookie(req, 'user'));
    const { id } = cookie;
    return id;
  } catch (err) {
    return null;
  }
};

export default (req: IncomingMessage, res: ServerResponse) => {
  const userID = extractUserID(req);

  if (userID) {
    const workingDir = path.join(process.cwd(), 'storage');
    const userDir = path.join(workingDir, userID);

    const results = {
      original: '',
      edges: '',
      debug: '',
      commands: '',
    };

    const originalImageName = fs
      .readdirSync(userDir)
      .filter((file) => file != 'export')?.[0];
    const { name, ext, base } = path.parse(originalImageName);

    results.original = path
      .join(userDir, originalImageName)
      .replace(process.cwd(), 'http://localhost:3000');
    results.edges = path
      .join(userDir, 'export', `${name}_edges${ext}`)
      .replace(process.cwd(), 'http://localhost:3000');
    results.debug = path
      .join(userDir, 'export', `${name}_debug_preview${ext}`)
      .replace(process.cwd(), 'http://localhost:3000');
    results.commands = path
      .join(userDir, 'export', `${name}_command.txt`)
      .replace(process.cwd(), 'http://localhost:3000');

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end('{}');
  }
};
