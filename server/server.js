const express = require('express');
const debug = require('debug')('server');
const app = express();
const fs = require('fs');
const path = require('path');
const React = require('react');
import ReactDOMserver from 'react-dom/server'

import Comics from '../src/App';

const PORT = process.env.PORT || 8000;



app.use('^/$', (req, res, next) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
        if(err){
            console.log(err)
            return res.status(500).send("Some error occured")
        }
        return res.send(
            data.replace(
                '<div id="root"></div>', 
                `<div id="root">${ReactDOMserver.renderToString(<Comics />)}</div>`
                )
        );
    })
})

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
})