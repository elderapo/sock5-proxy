const socks = require("socksv5");
const os = require("os");

const PORT = process.env.PORT || 1080;
const LOGIN = process.env.LOGIN;
const PASSWORD = process.env.PASSWORD;

console.log(`Credintials: ${LOGIN}:${PASSWORD}`);

const createServer = ip => {
  const server = socks.createServer((info, accept, deny) => {
    if (ip) {
      info.localAddress = ip;
    }
    console.log("New connection:", info);
    accept();
  });

  if (LOGIN && PASSWORD) {
    isAuthUsed = true;
    server.useAuth(
      socks.auth.UserPassword((user, password, cb) => {
        cb(user === LOGIN && password === PASSWORD);
      })
    );
  } else {
    console.error("Set LOGIN & PASSWORD env variables!");
    process.exit(1);
  }

  server.listen(PORT, ip, err => {
    if (err) {
      return console.error(err);
    }
    console.log(`SOCKS server is listening on port: ${ip}:${PORT}!`);
  });
};

const interfaces = os.networkInterfaces();

for (const interfaceName of Object.keys(interfaces)) {
  const interface = interfaces[interfaceName];

  for (const info of interface) {
    if (info.family !== "IPv4") {
      continue;
    }

    createServer(info.address);
  }
}
