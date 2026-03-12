import type { LanguageRegistration } from "@shikijs/types";

const CRUZO_HTML_LANGUAGE: LanguageRegistration = {
  name: "cruzo-html",
  aliases: ["cruzo"],
  scopeName: "text.html.cruzo",
  patterns: [
    { include: "text.html.basic" },
    { include: "#mustache-expression" },
    { include: "#cruzo-attributes" },
  ],
  repository: {
    "mustache-expression": {
      name: "meta.embedded.expression.cruzo",
      begin: "\\{\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.begin.cruzo",
        },
      },
      end: "\\}\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.end.cruzo",
        },
      },
      patterns: [
        { match: "\\bonce::", name: "keyword.control.once.cruzo" },
        { match: "::rx\\b", name: "keyword.operator.reactive.cruzo" },
        {
          match: "\\b(root|this|event|index|app)\\b|\\$element\\b",
          name: "variable.language.cruzo",
        },
        {
          match: "\\?\\.|\\?\\?|=>|===|!==|==|!=|<=|>=|&&|\\|\\||[+\\-*/%!=<>]",
          name: "keyword.operator.expression.cruzo",
        },
        {
          match: "\\b(true|false|null|undefined)\\b",
          name: "constant.language.cruzo",
        },
        { match: "'[^']*'|\"[^\"]*\"|`[^`]*`", name: "string.quoted.cruzo" },
        { match: "\\b\\d+(?:\\.\\d+)?\\b", name: "constant.numeric.cruzo" },
      ],
    },
    "cruzo-attributes": {
      patterns: [
        {
          match: "\\b(repeat|attached|inner-html)\\b",
          name: "entity.other.attribute-name.cruzo",
        },
        {
          match: "\\blet-[a-zA-Z_][\\w-]*\\b",
          name: "entity.other.attribute-name.let.cruzo",
        },
        {
          match: "\\bon[a-zA-Z]+\\b",
          name: "entity.other.attribute-name.event.cruzo",
        },
        {
          begin: "(\\b(?:repeat|attached|inner-html|let-[a-zA-Z_][\\w-]*|on[a-zA-Z]+)\\b)(\\s*=\\s*)(\")",
          beginCaptures: {
            "1": { name: "entity.other.attribute-name.cruzo" },
            "2": { name: "punctuation.separator.key-value.cruzo" },
            "3": { name: "punctuation.definition.string.begin.cruzo" },
          },
          end: "\"",
          endCaptures: {
            "0": { name: "punctuation.definition.string.end.cruzo" },
          },
          name: "string.quoted.double.expression.cruzo",
          patterns: [{ include: "#mustache-expression" }],
        },
      ],
    },
  },
};

const CRUZO_TS_INJECTION_LANGUAGE: LanguageRegistration & { injectionSelector: string } = {
  name: "cruzo-ts-injection",
  scopeName: "source.ts.cruzo.injection",
  injectTo: ["source.ts", "source.js"],
  injectionSelector: "L:string.template.ts, L:string.template.js",
  patterns: [
    { include: "#mustache-expression" },
    { include: "#cruzo-attributes" },
  ],
  repository: {
    "mustache-expression": {
      name: "meta.embedded.expression.cruzo",
      begin: "\\{\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.begin.cruzo",
        },
      },
      end: "\\}\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.end.cruzo",
        },
      },
      patterns: [
        { match: "\\bonce::", name: "keyword.control.once.cruzo" },
        { match: "::rx\\b", name: "keyword.operator.reactive.cruzo" },
        {
          match: "\\b(root|this|event|index|app)\\b|\\$element\\b",
          name: "variable.language.cruzo",
        },
        {
          match: "\\?\\.|\\?\\?|=>|===|!==|==|!=|<=|>=|&&|\\|\\||[+\\-*/%!=<>]",
          name: "keyword.operator.expression.cruzo",
        },
        {
          match: "\\b(true|false|null|undefined)\\b",
          name: "constant.language.cruzo",
        },
        { match: "'[^']*'|\"[^\"]*\"|`[^`]*`", name: "string.quoted.cruzo" },
        { match: "\\b\\d+(?:\\.\\d+)?\\b", name: "constant.numeric.cruzo" },
      ],
    },
    "cruzo-attributes": {
      patterns: [
        {
          match: "\\b(repeat|attached|inner-html)\\b",
          name: "entity.other.attribute-name.cruzo",
        },
        {
          match: "\\blet-[a-zA-Z_][\\w-]*\\b",
          name: "entity.other.attribute-name.let.cruzo",
        },
        {
          match: "\\bon[a-zA-Z]+\\b",
          name: "entity.other.attribute-name.event.cruzo",
        },
      ],
    },
  },
};

export const SITE_SHIKI_LANGS = [
  "typescript",
  "bash",
  CRUZO_HTML_LANGUAGE,
  CRUZO_TS_INJECTION_LANGUAGE,
] as const;
