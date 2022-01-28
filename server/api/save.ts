import type { IncomingMessage, ServerResponse } from 'http';
import { useCookie } from 'h3';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import { db, storage } from '../utils/firebase_logic/common';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const extractUserID = (req: IncomingMessage): string | null => {
  try {
    const cookie = JSON.parse(useCookie(req, 'user'));
    const { id } = cookie;
    return id;
  } catch (err) {
    return null;
  }
};

const hashFile = (name: string) => {
  const fileBuffer = fs.readFileSync(name);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
};

export default async (req: IncomingMessage, res: ServerResponse) => {
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

    results.original = path.join(userDir, originalImageName);
    results.edges = path.join(userDir, 'export', `${name}_edges${ext}`);
    results.debug = path.join(userDir, 'export', `${name}_debug_preview${ext}`);
    results.commands = path.join(userDir, 'export', `${name}_command.txt`);

    const hashes = {
      original: hashFile(results.original),
      edges: hashFile(results.edges),
      debug: hashFile(results.debug),
      commands: hashFile(results.commands),
    };

    const q = query(
      collection(db, `${userID}/saves`),
      where('original', '==', hashes.original),
      where('commands', '==', hashes.commands),
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      // TODO get image url
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(hashes));
    } else {
      // TODO save to storage
      // TODO save to firestore
      // TODO get image url
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end('{}');
  }
};
