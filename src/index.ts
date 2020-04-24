import { parser } from "../grammar";
import { QueryNode } from "./interfaces/QueryNode";

export function parse(query: string): QueryNode {
  if (!query) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (parser as any).parse(query.trim());
}

export * from "./enums";
export * from "./interfaces";
