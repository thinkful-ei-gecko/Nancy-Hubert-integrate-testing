const express = require('express');
const morgan = require('morgan');
const app = require('./playServer/app')


app.listen(8000, () => {
    console.log('listening');
});