const socks = require("socksv5");

const PORT = process.env.PORT;
const LOGIN = process.env.LOGIN;
const PASSWORD = process.env.PASSWORD;

let isAuthUsed = false;
const server = socks.createServer((info, accept, deny) => {
  console.log("New connection:", info);
  accept();
});

server.listen(PORT, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`SOCKS server is listening on port: ${PORT}!`);
  console.log(`Credintials: ${LOGIN}:${PASSWORD}`);
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
