import { useCallback } from 'react';
import { parseRdfTurtle } from '../services/rdfParser';
import { convertRdfToGraph } from '../services/graphConverter';
import { useGraphData } from '../context/GraphDataContext';

export function useRdfStore() {
  const { setGraphData } = useGraphData();

  const loadRdfFromString = useCallback((turtleContent: string, baseUri?: string) => {
    const parsed = parseRdfTurtle(turtleContent, baseUri);
    const graphData = convertRdfToGraph(parsed);
    setGraphData(graphData);
  }, [setGraphData]);

  const loadRdfFromFile = useCallback(async (file: File) => {
    const content = await file.text();
    loadRdfFromString(content);
  }, [loadRdfFromString]);

  return {
    loadRdfFromString,
    loadRdfFromFile,
  };
}
