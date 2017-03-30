var express = require('express')
var path = require('path')
var compression = require('compression')

var app = express()
var bodyParser = require('body-parser')
app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
import { MongoClient, ObjectID } from 'mongodb';
// ...
// import some new stuff
import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './modules/routes'
var connectionString = 'mongodb://localhost/nflSchedule';
var dbConn;
function conMongo(callback) {
  if (!dbConn) {
    MongoClient.connect(connectionString, (err, db) => {
      if (err) {
        console.log(err)
      } else {
        dbConn = (!err ? db : null);
				var logger = dbConn.collection('logs');
				logger.insertOne({working: 'yes'})
        callback(dbConn);

      }

    })
  } else {
    callback(dbConn);
  }
};

app.get('/getTeams', (req, res) => {
  conMongo((db) => {
    var teams = db.collection('teams');
    res.status(200).send(['cowboys', 'broncos']);
  })
})
// send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
		match({ routes: routes, location: req.url }, (err, redirect, props) => {
			// in here we can make some decisions all at once
			if (err) {
				// there was an error somewhere during route matching
				res.status(500).send(err.message)
			} else if (redirect) {
				// we haven't talked about `onEnter` hooks on routes, but before a
				// route is entered, it can redirect. Here we handle on the server.
				res.redirect(redirect.pathname + redirect.search)
			} else if (props) {
				// if we got props then we matched a route and can render
				const appHtml = renderToString(<RouterContext {...props}/>)
				res.send(renderPage(appHtml))
      //  res.send('page' + req.url);
			} else {
				// no errors, no redirect, we just didn't match anything
				res.status(404).send('Not Found')
			}
		})
})


function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>NFL Schedule App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
