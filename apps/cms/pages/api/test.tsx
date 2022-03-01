import write from 'write';
import fs from 'fs';

export default function handler(req, res) {
  if (req.method === 'POST') {
    write('apps/cms/db/index.json', JSON.stringify(req.body), {
      overwrite: true,
    });
  } else {
    const file = fs.readFileSync('apps/cms/db/index.json');
    res.status(200).json(file);
  }
}
