import fs from 'fs';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (oldPath: string, newPath: string, callback: (...args: any[]) => unknown) => void;

export const copy: Func = (oldPath, newPath, callback) => {
  const readStream = fs.createReadStream(oldPath);
  const writeStream = fs.createWriteStream(newPath);

  readStream.on('error', (err) => {
    console.log(err);
    callback(err);
  });
  writeStream.on('error', (err) => {
    console.log(err);
    callback(err);
  });

  readStream.on('close', () => {
    fs.unlink(oldPath, callback);
  });

  readStream.pipe(writeStream);
};

export const move: Func = (oldPath, newPath, callback) => {
  const dir = path.dirname(newPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      if (err.code === 'EXDEV') {
        copy(oldPath, newPath, callback);
      } else {
        callback(err);
      }
    }
    callback();
  });
};
