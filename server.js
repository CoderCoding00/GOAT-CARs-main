const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');


const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  helpers
});

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 3000000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
const sessionMiddleware = session(sess);
app.use(sessionMiddleware);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({ 
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));
app.use("/", express.static(path.join(__dirname, 'public')));
app.use("/merchandise", express.static(path.join(__dirname, 'public')));
app.use("/forum", express.static(path.join(__dirname, 'public')));
app.use("/forum/view-post", express.static(path.join(__dirname, 'public')));
app.use("/gallery", express.static(path.join(__dirname, 'public')));
app.use("/auction", express.static(path.join(__dirname, 'public')));
app.use("/auction/bid", express.static(path.join(__dirname, 'public')));


app.use(routes);


sequelize.sync({ force: false }).then(() => {
  const server = app.listen(PORT, () => console.log('Now listening at localhost:3001'));
  const io = require('./socket').init(server);
  
  io.on('connection', (socket) => {
    console.log('A user connected ' + socket.id);

    socket.on('message', (data) => {
      console.log('its receiving the signal')
      socket.broadcast.emit('message', data);
    })

    socket.on('disconnect', function() {
      console.log('A user disconnected');
    });
  });
  

});