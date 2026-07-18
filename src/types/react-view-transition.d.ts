import type { ReactNode } from 'react';

declare module 'react' {
  type ViewTransitionClass = 'none' | 'auto' | (string & {});

  type ViewTransitionClassPerType = {
    [transitionType: string]: ViewTransitionClass;
  };

  interface ViewTransitionProps {
    children?: ReactNode;
    name?: string;
    default?: ViewTransitionClass | ViewTransitionClassPerType;
    enter?: ViewTransitionClass | ViewTransitionClassPerType;
    exit?: ViewTransitionClass | ViewTransitionClassPerType;
    share?: ViewTransitionClass | ViewTransitionClassPerType;
  }

  export function ViewTransition(props: ViewTransitionProps): ReactNode;
}
