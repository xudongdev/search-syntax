import { parse } from ".";

test("number:123", () => {
  expect(parse("number:123")).toMatchObject({
    type: "query",
    value: [
      {
        connective: "AND",
        node: {
          type: "term",
          name: "number",
          comparator: "EQ",
          value: 123,
          not: false,
        },
      },
    ],
  });
});

test("number:>123", () => {
  expect(parse("number:>123")).toMatchObject({
    type: "query",
    value: [
      {
        connective: "AND",
        node: {
          type: "term",
          name: "number",
          comparator: "GT",
          value: 123,
          not: false,
        },
      },
    ],
  });
});
