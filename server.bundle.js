/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _mongodb = __webpack_require__(1);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(3);

	var _reactRouter = __webpack_require__(4);

	var _routes = __webpack_require__(5);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var express = __webpack_require__(13);
	var path = __webpack_require__(14);
	var compression = __webpack_require__(15);

	var app = express();
	var bodyParser = __webpack_require__(16);
	app.use(compression());

	// serve our static stuff like index.css
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	// ...
	// import some new stuff

	// we'll use this to render our app to an html string

	// and these to match the url to routes and then render

	var connectionString = 'mongodb://localhost/nflSchedule';
	var dbConn;
	function conMongo(callback) {
	  if (!dbConn) {
	    _mongodb.MongoClient.connect(connectionString, function (err, db) {
	      if (err) {
	        console.log(err);
	      } else {
	        dbConn = !err ? db : null;
	        var logger = dbConn.collection('logs');
	        logger.insertOne({ working: 'yes' });
	        callback(dbConn);
	      }
	    });
	  } else {
	    callback(dbConn);
	  }
	};

	app.get('/getTeams', function (req, res) {
	  conMongo(function (db) {
	    var teams = db.collection('teams');
	    res.status(200).send(['cowboys', 'broncos']);
	  });
	});
	// send all requests to index.html so browserHistory works
	app.get('*', function (req, res) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    // in here we can make some decisions all at once
	    if (err) {
	      // there was an error somewhere during route matching
	      res.status(500).send(err.message);
	    } else if (redirect) {
	      // we haven't talked about `onEnter` hooks on routes, but before a
	      // route is entered, it can redirect. Here we handle on the server.
	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {
	      // if we got props then we matched a route and can render
	      var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	      res.send(renderPage(appHtml));
	      //  res.send('page' + req.url);
	      //  res.send('page' + req.url);
	    } else {
	      // no errors, no redirect, we just didn't match anything
	      res.status(404).send('Not Found');
	    }
	  });
	});

	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>NFL Schedule App</title>\n    <link rel=stylesheet href=/index.css>\n    <div id=app>' + appHtml + '</div>\n    <script src="/bundle.js"></script>\n   ';
	}

	var PORT = process.env.PORT || 8080;
	app.listen(PORT, function () {
	  console.log('Production Express server running at localhost:' + PORT);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _App = __webpack_require__(6);

	var _App2 = _interopRequireDefault(_App);

	var _About = __webpack_require__(8);

	var _About2 = _interopRequireDefault(_About);

	var _Teams = __webpack_require__(9);

	var _Teams2 = _interopRequireDefault(_Teams);

	var _team = __webpack_require__(11);

	var _team2 = _interopRequireDefault(_team);

	var _Home = __webpack_require__(12);

	var _Home2 = _interopRequireDefault(_Home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/teams', component: _Teams2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/team/:teamId', component: _team2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/about', component: _About2.default })
	);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(7);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h1',
	        null,
	        'React Router Tutorial'
	      ),
	      _react2.default.createElement(
	        'ul',
	        { role: 'nav' },
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/', onlyActiveOnIndex: true },
	            'Home'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/about' },
	            'About'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/Teams' },
	            'Teams'
	          )
	        )
	      ),
	      this.props.children
	    );
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // modules/NavLink.js


	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'NavLink',
	  render: function render() {
	    return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'active' }));
	  }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'About',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      'About'
	    );
	  }
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(7);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	var _superagent = __webpack_require__(10);

	var _superagent2 = _interopRequireDefault(_superagent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Teams',

	  contextTypes: {
	    router: _react2.default.PropTypes.object,
	    teamList: _react2.default.PropTypes.array
	  },
	  getInitialState: function getInitialState() {
	    return {
	      teamList: null
	    };
	  },
	  // setState: function(valsIn) {
	  //   console.log('setting here', valsIn);
	  //   if (valsIn) {
	  //     this.setState({
	  //       teamList: valsIn
	  //     })
	  //   }
	  // },

	  componentDidMount: function componentDidMount() {
	    //  mongodb.connect('mongodb://localhost/nflSchedule');
	    this.getTeams();
	  },
	  getTeams: function getTeams() {
	    var that = this;

	    _superagent2.default.get('/getTeams').end(function (err, res) {
	      if (res.body) {
	        console.log(res.body, that);
	        that.setState({
	          teamList: res.body
	        });
	      }
	    });
	  },
	  render: function render() {
	    console.log('rendering', teamList);
	    var teamList = this.state.teamList;

	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Teams'
	      ),
	      teamList ? _react2.default.createElement(
	        'ul',
	        null,
	        teamList.map(function (team) {
	          return _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              'a',
	              { href: '/team/123' },
	              team
	            )
	          );
	        })
	      ) : null
	    );
	  }
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("superagent");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'team',
	  render: function render() {
	    console.log(this.props.params);
	    var teamId = this.props.params.teamId;

	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h2',
	        null,
	        'This team is ',
	        teamId
	      )
	    );
	  }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Home',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      'Home'
	    );
	  }
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ }
/******/ ]);