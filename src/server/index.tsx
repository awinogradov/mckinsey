import React from 'react';
import express from 'express';
import bodyParser from 'body-parser';
import { renderToString } from 'react-dom/server';

import { db } from '../database';
import { Folder } from '../components/Folder/Folder';

import api from './api';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
const server = express();

export default server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .use(bodyParser.json())
  .use(api)
  .get('/', (_, res) => {
    const markup = renderToString(<Folder store={db} />);

    res.status(200).send(
      `<!doctype html>
        <html lang="">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            <title>Welcome to spam admin panel</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${
              assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
            }
            <script>window.__initialState__ = ${JSON.stringify(db)};</script>
            ${
              process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
            }
        </head>
        <body>
            <div id="root">${markup}</div>
        </body>
    </html>`
    );
  });
