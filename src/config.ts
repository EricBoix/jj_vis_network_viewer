export const config = {

  sidebar: {
    defaultWidth: 300,
    minWidth:     150,
    maxWidth:     700,
  },

  rdf: {
    // Predicate URI used by Neo4j RDF exports for the internal node identifier.
    neo4jIdPredicateUri: 'http://example.org/neo4j/id',
  },

  // Initial values for settings that the user can change at runtime via the UI.
  viewSettings: {
    // Text shown (node labels) on each graph node. Possible choices: 
    //    'name' (for rdfs:label) | 'neoId' (for Neo4j internal id).
    nodeLabelMode:        'neoId'     as const,
    physicsEnabled:       true,
    hideIsolatedNodes:    true,
    // Node types whose Overview checkbox is unchecked when a graph is first loaded.
    hiddenByDefaultTypes: ['Document'],
  },

  // vis-network rendering parameters.
  graph: {
    nodeSizePx:        20,
    nodeFontSizePx:    14,
    nodeBorderWidthPx: 2,
    edgeWidthPx:       2,
    edgeFontSizePx:    12,
    physics: {
      gravitationalConstant: -50,
      centralGravity:        0.01,
      springLength:          100,
      springConstant:        0.08,
      stabilizationIter:     100,
    },
  },

} as const;
