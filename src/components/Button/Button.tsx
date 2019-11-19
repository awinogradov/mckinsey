import React from 'react';
import { cn } from '@bem-react/classname';

import './Button.css';

const cnButton = cn('Button');

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: string;
}

export const Button: React.FC<ButtonProps> = props => (
  <button
    className={cnButton(null, [props.className])}
    onClick={props.onClick}>
      {props.children}
    </button>
);
