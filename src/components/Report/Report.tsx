import React from 'react';
import { cn } from '@bem-react/classname';
import { compose } from 'really-typed-compose';

import { ReportReflection } from '../../typings';
import { Field } from '../Field/Field';
import { Button } from '../Button/Button';

import './Report.css';

export interface ReportProps {
  reflection: ReportReflection;
  onBlock?: () => void;
  onResolve: () => void;
}

const cnReport = cn('Report');
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
const humanize = (str: string) => str.replace(/_/g, ' ');
const normalizeFieldValue = compose(humanize, capitalize);

export const Report: React.FC<ReportProps> = React.memo(props => (
  <div className={cnReport({ blocked: props.reflection.blocked })}>
    <div className={cnReport('Column', { type: 'data' })}>
      <Field title="Id">{props.reflection.payload.reportId}</Field>
      <Field title="State">{normalizeFieldValue(props.reflection.state)}</Field>
    </div>
    <div className={cnReport('Column', { type: 'data' })}>
      <Field title="Type">{normalizeFieldValue(props.reflection.payload.reportType)}</Field>
      {props.reflection.payload.message && <Field title="Message">{normalizeFieldValue(props.reflection.payload.message)}</Field>}
    </div>
    <div className={cnReport('Column', { type: 'actions' })}>
      {!props.reflection.blocked && <Field>
        <Button className={cnReport('Button')} onClick={props.onBlock}>Block</Button>
      </Field>}
      <Field>
        <Button className={cnReport('Button')} onClick={props.onResolve}>Resolve</Button>
      </Field>
    </div>
  </div>
));
