import React from 'react';
import { cn } from '@bem-react/classname';

import './Field.css';

const cnField = cn('Field');
const cachedCn = cnField();

export interface FieldProps {
  title?: string;
}

export const Field: React.FC<FieldProps> = props => (
  <div className={cachedCn}>
    {props.title && <span className={cnField('Title')}>{props.title}: </span>}{props.children}
  </div>
);
