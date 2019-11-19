import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import { DBNormalized, reportState } from '../../typings';
import { Report } from '../Report/Report';
import { Button } from '../Button/Button';

import './Folder.css';

const cnFolder = cn('Folder');
const cachedCn = cnFolder();

export interface AppProps {
  store: DBNormalized;
}

export const Folder: React.FC<AppProps> = React.memo(props => {
  const [store, updateStore] = useState(props.store);
  const reports = Object.values(store.reports);
  const available = reports.filter(reflection => reflection.state === reportState.open);

  const onResolveCreator = (reportId: string) => {
    return async () => {
      const res = await fetch(`/reports/${reportId}`, {
        method: 'PUT'
      });
      const newState = await res.json();
      updateStore(newState);
    };
  };

  const onBlockCreator = (reportId: string) => {
    return async () => {
      const res = await fetch(`/block/${reportId}`, {
        method: 'PUT'
      });
      const newState = await res.json();
      updateStore(newState);
    };
  };

  const onRefresh = async () => {
    const res = await fetch('/refresh', {
      method: 'POST'
    });
    const newState = await res.json();
    updateStore(newState);
  };

  return (
      <div className={cachedCn}>
        <div className={cnFolder('Refresh')}>
          <Button onClick={onRefresh}>Refresh</Button>
        </div>
        <div className={cnFolder('Reports')}>
          {available.map(reflection =>
            <Report
              key={reflection.id}
              reflection={reflection}
              onBlock={onBlockCreator(reflection.payload.reportId)}
              onResolve={onResolveCreator(reflection.payload.reportId)} />)}
        </div>
      </div>
  )
});
