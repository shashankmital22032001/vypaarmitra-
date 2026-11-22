// PM2 process file: keeps the site running and restarts it after a crash or reboot.
// Used by deploy/update.sh. Settings here override the same keys in backend/.env.
const path = require('node:path');

module.exports = {
  apps: [
    {
      name: 'vypaarmitra',
      cwd: path.join(__dirname, '..', 'backend'),
      script: 'src/server.js',
      node_args: '--env-file-if-exists=.env',
      env: {
        NODE_ENV: 'production',
        PORT: '5000',
        CORS_ORIGINS: 'https://vypaarmitra.com,https://www.vypaarmitra.com',
      },
      max_memory_restart: '500M',
      time: true,
    },
  ],
};
