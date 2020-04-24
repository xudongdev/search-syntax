import { Connective } from "../enums/Connective";
import { QueryNode } from "./QueryNode";
import { TermNode } from "./TermNode";

export interface Children {
  connective: Connective;

  node: TermNode | QueryNode;
}
