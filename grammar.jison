/* lexical grammar */
%lex

%options case-insensitive

badcharsincnot               [^\s'"\+\,\(\)\>\<=\[\]\-]
badcharsnonot                [^\s'"\+\,\(\)\>\<=\[\]]
escapable                    ['"\+\,\(\)\>\<=\[\]]

%%

\s+                                                 return 'WHITESPACE'
"NOT"                                               return 'NOT'
"AND"                                               return 'AND'
"OR"                                                return 'OR'
'('                                                 return 'LPAREN'
')'                                                 return 'RPAREN'
"<"                                                 return 'LT'
"<="                                                return 'LE'
">"                                                 return 'GT'
">="                                                return 'GE'
"null"                                              return "NULL"
"true"                                              return "TRUE"
"false"                                             return "FALSE"
[a-zA-Z_][a-zA-Z0-9_\.]*[:]                         return 'NAME'
\-?[0-9]+(\.[0-9]+)?\b                              return 'NUMBER'
["](\\['"]|[^'"])+?["]                              return 'STRING'
{badcharsincnot}(\\{escapable}|{badcharsnonot})+    return 'LITERAL'
<<EOF>>                                             return 'EOF'
.                                                   return 'INVALID'

/lex

%start root
%% /* language grammar */

root
  : query EOF
    { return $1; }
  ;

query
  : term
    {
      $$ = {
        type: "query",
        value: [
          {
            connective: "AND",
            node: $1
          }
        ]
      };
    }
  | query 'WHITESPACE' term
    {
      $$ = {
        type: "query",
        value: [
          ...$1.value,
          {
            connective: "AND",
            node: $3
          }
        ]
      };
    }
  | query 'WHITESPACE' connective 'WHITESPACE' term
    {
      $$ = {
        type: "query",
        value: [
          ...$1.value,
          {
            connective: $3,
            node: $5
          }
        ]
      };
    }
  ;

term
  : value
    {
      $$ = {
        type: "term",
        name: null,
        comparator: 'EQ',
        value: $1,
        not: false
      };
    }
  | 'NAME' comparator value
    {
      $$ = {
        type: "term",
        name: $1.replace(/:$/, ''),
        comparator: $2,
        value: $3,
        not: false
      };
    }
  | 'LPAREN' query 'RPAREN'
    {
      $$ = $2;
    }
  | 'NOT' 'WHITESPACE' term
    {
      $$ = {
        ...$3,
        not: true
      };
    }
  ;

connective
  : 'AND'
    { $$ = "AND"; }
  | 'OR'
    { $$ = "OR"; }
  ;

comparator
  : 'LE'
    { $$ = "LE"; }
  | 'LT'
    { $$ = "LT"; }
  | 'GE'
    { $$ = "GE"; }
  | 'GT'
    { $$ = "GT"; }
  |
    { $$ = "EQ"; }
  ;

value
  : 'TRUE'
    { $$ = true; }
  | 'FALSE'
    { $$ = false; }
  | 'NUMBER'
    { $$ = Number($1); }
  | LITERAL
    { $$ = $1; }
  | 'STRING'
    {
      $$ = $1.replace(/^\"|\"$/g, "");
    }
  ;