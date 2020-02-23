import { parser } from "../grammar";

export enum NodeType {
  QUERY = "query",
  TERM = "term"
}

export enum Connective {
  AND = "AND",
  OR = "OR"
}

export enum Comparator {
  EQ = "EQ",
  LT = "LT",
  GT = "GT",
  LE = "LE",
  GE = "GE"
}

export interface Node {
  type: NodeType;
}

export interface QueryNode extends Node {
  type: NodeType.QUERY;
  value: Array<{
    connective: Connective;
    term: TermNode;
  }>;
}

export interface TermNode extends Node {
  type: NodeType.TERM;
  name: string;
  comparator: Comparator;
  value: null | boolean | number | string;
  not: boolean;
}

export function parse(query: string) {
  return parser.parse(query);
}
