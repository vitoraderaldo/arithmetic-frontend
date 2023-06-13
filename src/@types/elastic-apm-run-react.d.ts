declare module '@elastic/apm-rum-react' {
  import { ComponentType } from 'react';
  import { Route } from 'react-router';
  export const ApmRoute: typeof Route;

  export const withTransaction: (
    name: string,
    eventType: string,
  ) => <T>(component: ComponentType<T>) => ComponentType<T>;
}
