import { graph, parse, NamedNode, Literal, BlankNode, Statement } from 'rdflib';

export interface RdfTriple {
  subject: string;
  predicate: string;
  object: string;
  objectType: 'uri' | 'literal' | 'blank';
  objectValue: string;
}

export interface ParsedRdf {
  triples: RdfTriple[];
  subjects: Set<string>;
  namespaces: Record<string, string>;
}

function getTermValue(term: NamedNode | Literal | BlankNode): string {
  if (term instanceof NamedNode) {
    return term.uri;
  }
  if (term instanceof Literal) {
    return term.value;
  }
  if (term instanceof BlankNode) {
    return term.value;
  }
  return String(term);
}

function getTermType(term: NamedNode | Literal | BlankNode): 'uri' | 'literal' | 'blank' {
  if (term instanceof NamedNode) return 'uri';
  if (term instanceof Literal) return 'literal';
  if (term instanceof BlankNode) return 'blank';
  return 'literal';
}

function extractNamespaces(turtleContent: string): Record<string, string> {
  const namespaces: Record<string, string> = {};
  const re = /@prefix\s+([\w-]*):\s*<([^>]+)>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(turtleContent)) !== null) {
    namespaces[m[1]] = m[2];
  }
  return namespaces;
}

export function parseRdfTurtle(turtleContent: string, baseUri: string = 'http://example.org/'): ParsedRdf {
  const store = graph();
  parse(turtleContent, store, baseUri, 'text/turtle');

  const triples: RdfTriple[] = [];
  const subjects = new Set<string>();

  store.statements.forEach((statement: Statement) => {
    const subjectValue = getTermValue(statement.subject as NamedNode | BlankNode);
    subjects.add(subjectValue);

    triples.push({
      subject: subjectValue,
      predicate: getTermValue(statement.predicate as NamedNode),
      object: getTermValue(statement.object as NamedNode | Literal | BlankNode),
      objectType: getTermType(statement.object as NamedNode | Literal | BlankNode),
      objectValue: getTermValue(statement.object as NamedNode | Literal | BlankNode),
    });
  });

  return { triples, subjects, namespaces: extractNamespaces(turtleContent) };
}

export function uriToPrefixedName(uri: string, namespaces: Record<string, string>): string {
  let bestPrefix = '';
  let bestNs = '';
  for (const [prefix, ns] of Object.entries(namespaces)) {
    if (uri.startsWith(ns) && ns.length > bestNs.length) {
      bestPrefix = prefix;
      bestNs = ns;
    }
  }
  return bestNs ? `${bestPrefix}:${uri.slice(bestNs.length)}` : getLocalName(uri);
}

export function getLocalName(uri: string): string {
  const hashIndex = uri.lastIndexOf('#');
  if (hashIndex !== -1) {
    return uri.substring(hashIndex + 1);
  }
  const slashIndex = uri.lastIndexOf('/');
  if (slashIndex !== -1) {
    return uri.substring(slashIndex + 1);
  }
  return uri;
}
