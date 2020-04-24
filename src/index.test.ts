import { parse } from ".";

test("Empty query", () => {
  expect(parse("")).toBe(null);
  expect(parse(null)).toBe(null);
  expect(parse(undefined)).toBe(null);
});

test("Removes leading and trailing whitespace", () => {
  expect(parse("field:test ")).toMatchObject({
    type: "query",
    value: [
      {
        connective: "AND",
        node: {
          type: "term",
          name: "field",
          comparator: "EQ",
          value: "test",
          not: false,
        },
      },
    ],
  });
});

test("Decimal point", () => {
  expect(parse("number:123.45")).toMatchObject({
    type: "query",
    value: [
      {
        connective: "AND",
        node: {
          type: "term",
          name: "number",
          comparator: "EQ",
          value: 123.45,
          not: false,
        },
      },
    ],
  });
});

test("GT", () => {
  expect(parse("number:>123.45")).toMatchObject({
    type: "query",
    value: [
      {
        connective: "AND",
        node: {
          type: "term",
          name: "number",
          comparator: "GT",
          value: 123.45,
          not: false,
        },
      },
    ],
  });
});

test("AND", () => {
  expect(parse('name:"John Wick" AND enable:true')).toMatchObject({
    type: "query",
    value: [
      {
        connective: "AND",
        node: {
          type: "term",
          name: "name",
          comparator: "EQ",
          value: "John Wick",
          not: false,
        },
      },
      {
        connective: "AND",
        node: {
          type: "term",
          name: "enable",
          comparator: "EQ",
          value: true,
          not: false,
        },
      },
    ],
  });
});

test("OR", () => {
  expect(parse("name:John OR enable:true")).toMatchObject({
    type: "query",
    value: [
      {
        connective: "AND",
        node: {
          type: "term",
          name: "name",
          comparator: "EQ",
          value: "John",
          not: false,
        },
      },
      {
        connective: "OR",
        node: {
          type: "term",
          name: "enable",
          comparator: "EQ",
          value: true,
          not: false,
        },
      },
    ],
  });
});

test("Subquery", () => {
  expect(
    parse(
      'name:John OR (created_at:>="2020-01-01 00:00:00" AND created_at:<="2020-12-31 23:59:59")'
    )
  ).toMatchObject({
    type: "query",
    value: [
      {
        connective: "AND",
        node: {
          type: "term",
          name: "name",
          comparator: "EQ",
          value: "John",
          not: false,
        },
      },
      {
        connective: "OR",
        node: {
          type: "query",
          value: [
            {
              connective: "AND",
              node: {
                type: "term",
                name: "created_at",
                comparator: "GE",
                value: "2020-01-01 00:00:00",
                not: false,
              },
            },
            {
              connective: "AND",
              node: {
                type: "term",
                name: "created_at",
                comparator: "LE",
                value: "2020-12-31 23:59:59",
                not: false,
              },
            },
          ],
        },
      },
    ],
  });
});
