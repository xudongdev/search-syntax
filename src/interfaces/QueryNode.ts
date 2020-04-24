import { NodeType } from "../enums/NodeType";
import { Children } from "./Children";
import { Node } from "./Node";

export interface QueryNode extends Node {
  type: NodeType.QUERY;
  value: Children[];
}
