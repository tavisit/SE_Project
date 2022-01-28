import type { IncomingMessage, ServerResponse } from 'http';
import { useCookie } from 'h3';
import * as path from 'path';
import * as fs from 'fs';
import * as child from 'child_process';
import formidable from 'formidable';

export interface LoginParams {
  high?: string;
  password?: string;
}

const form = formidable();

// TODO make a response handler to send errors and such

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
  req.socket.setKeepAlive(true);
  req.socket.setTimeout(1000 * 60 * 10, () => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end('{}');
  });
  res.socket.setKeepAlive(true);
  res.socket.setTimeout(1000 * 60 * 10, () => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end('{}');
  });

  if (userID) {
    form.parse(req, async (err, fields, files) => {
      let { highThresh, lowThresh, skipCanny, precision } = fields;
      highThresh = parseFloat(highThresh?.[0] ?? '60');
      lowThresh = parseFloat(lowThresh?.[0] ?? '50');
      precision = parseFloat(lowThresh?.[0] ?? '0.5');
      skipCanny = parseInt(skipCanny?.[0] ?? '0') ? true : false;

      let conversionCommand = '';
      const file = files?.file?.[0];
      const results = {
        original: '',
        edges: '',
        debug: '',
        commands: '',
      };
      if (file) {
        const { filepath, newFilename, originalFilename, mimetype, size } =
          file;
        const { name, ext, base } = path.parse(originalFilename);
        // console.log(name, ext, base);
        // console.log(filepath, newFilename);
        // console.log(process.cwd());
        // delete old user files
        const workingDir = path.join(process.cwd(), 'storage');
        const userDir = path.join(workingDir, userID);
        fs.mkdirSync(userDir, { recursive: true });
        child.execSync(`rm -rf ${userDir}/*`);
        // copy image
        const newFilepath = path.join(userDir, originalFilename);
        fs.copyFileSync(filepath, newFilepath);
        // make folder structure for the conversion program
        fs.mkdirSync(path.join(userDir, 'export', 'edges'), {
          recursive: true,
        });

        results.original = newFilepath.replace(
          process.cwd(),
          'http://localhost:3000',
        );
        results.edges = path
          .join(userDir, 'export', `${name}_edges${ext}`)
          .replace(process.cwd(), 'http://localhost:3000');
        results.debug = path
          .join(userDir, 'export', `${name}_debug_preview${ext}`)
          .replace(process.cwd(), 'http://localhost:3000');
        results.commands = path
          .join(userDir, 'export', `${name}_command.txt`)
          .replace(process.cwd(), 'http://localhost:3000');

        // example: converter ./assets/test.jpg -l 15 -h 50 -o ./assets/export export -d 0.2 -i -p 0.2
        const skipCannyArg = skipCanny ? '--skip-canny' : '';
        conversionCommand = `./converter ${newFilepath} -l ${lowThresh} -h ${highThresh} -o ${userDir}/export ${skipCannyArg} export -d ${precision} -i -p ${precision}`;
        child.exec(conversionCommand);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          invalid: [],
          message: 'Success',
          data: {
            conversionCommand,
            ...results,
          },
        }),
      );
    });
  } else {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        invalid: [],
        message: 'Not authenticated',
      }),
    );
  }
};
