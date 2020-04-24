import parser from "../grammar";
import { QueryNode } from "./interfaces/QueryNode";

export function parse(query: string): QueryNode {
  return (parser as any).parse(query);
}
