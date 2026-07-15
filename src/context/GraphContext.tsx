import { ReactNode } from 'react';
import { GraphDataProvider } from './GraphDataContext';
import { ViewSettingsProvider } from './ViewSettingsContext';

export function GraphProvider({ children }: { children: ReactNode }) {
  return (
    <GraphDataProvider>
      <ViewSettingsProvider>
        {children}
      </ViewSettingsProvider>
    </GraphDataProvider>
  );
}
