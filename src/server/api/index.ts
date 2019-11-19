import { Router } from 'express';

import { reportState, DBNormalized, ReportReflection } from '../../typings';
import { db, update } from '../../database';

const api = Router();

api.put('/reports/:reportId', (req, res) => {
  const { reportId } = req.params;
  const report = db.reports[reportId];

  if (!report) {
    res.status(404).end();
  } else {
    db.reports[reportId].state = reportState.closed;

    res.json(db);
  }
});

api.put('/block/:reportId', (req, res) => {
  const { reportId } = req.params;
  const report = db.reports[reportId];

  if (!report) {
    res.status(404).end();
  } else {
    db.reports[reportId].blocked = true;

    res.json(db);
  }
});

api.post('/refresh', (_, res) => {
  const refreshed = Object.values(db.reports).reduce((acc: DBNormalized, curr: ReportReflection) => {
    acc.reports[curr.payload.reportId] = curr;
    acc.reports[curr.payload.reportId].state = reportState.open;
    acc.reports[curr.payload.reportId].blocked = undefined;

    return acc;
  }, { reports: {} });

  update(refreshed);

  res.json(refreshed);
});

export default api;
