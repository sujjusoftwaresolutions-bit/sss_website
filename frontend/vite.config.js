import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Vite plugin to support HTTP Range requests (206 Partial Content) for video streaming in dev mode
const videoRangePlugin = () => ({
  name: 'video-range-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.endsWith('.mp4')) {
        const filePath = path.join(process.cwd(), 'public', req.url.split('?')[0]);
        if (fs.existsSync(filePath)) {
          const stat = fs.statSync(filePath);
          const fileSize = stat.size;
          const range = req.headers.range;

          if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(filePath, { start, end });
            const head = {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunksize,
              'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
            return;
          }
        }
      }
      next();
    });
  }
});

export default defineConfig({
  plugins: [react(), videoRangePlugin()],
});
