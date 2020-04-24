import { Comparator } from "../enums/Comparator";
import { NodeType } from "../enums/NodeType";
import { Node } from "./Node";

export interface TermNode extends Node {
  type: NodeType.TERM;
  name: string;
  comparator: Comparator;
  value: null | boolean | number | string;
  not: boolean;
}
