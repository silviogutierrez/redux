var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get('/api/widgets/', function(req, res) {
    res.send(WIDGETS);
});

app.get('/api/widgets/:id/', function(req, res) {
    res.send(WIDGETS.find(function(w) {
        return w.id === parseInt(req.params.id);
    }));
});

app.get('/api/factories/', function(req, res) {
    res.send(FACTORIES);
});

app.get('/api/factories/:id/', function(req, res) {
    res.send(FACTORIES.find(function(f) {
        return f.id === parseInt(req.params.id);
    }));
});

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

const FACTORIES = [
    {
        id: 1,
        name: 'Casa de Silvio',
    },
    {
        id: 2,
        name: 'El Tequilazo',
    },
];

const WIDGETS = [
    {
        id: 11,
        name: 'Widget 1',
        cost: 300,
        factory: FACTORIES[0],
    },
    {
        id: 12,
        name: 'Widget 2',
        cost: 200,
        factory: FACTORIES[1],
    },
];
