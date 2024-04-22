import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeHighlighter({ codeString }) {
  const customStyle = {
    ...atomDark,
    'code[class*="language-"]': {
      color: "#96CBFE",
      textShadow: "0 1px rgba(0, 0, 0, 0.3)",
      fontFamily:
        "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
      direction: "ltr",
      textAlign: "left",
      whiteSpace: "pre",
      wordSpacing: "normal",
      wordBreak: "normal",
      lineHeight: "1.5",
      MozTabSize: "4",
      OTabSize: "4",
      tabSize: "4",
      WebkitHyphens: "none",
      MozHyphens: "none",
      msHyphens: "none",
      hyphens: "none",
    },
    'pre[class*="language-"]': {
      color: "#C6C5FE",
      background: "rgba(40, 42, 54, 0.2)",
      boxShadow: "inset 0 0 0 1px #ffffff1a",
      textShadow: "0 1px rgba(0, 0, 0, 0.3)",
      fontFamily:
        "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
      direction: "ltr",
      textAlign: "left",
      whiteSpace: "pre",
      wordSpacing: "normal",
      wordBreak: "normal",
      lineHeight: "1.5",
      MozTabSize: "4",
      OTabSize: "4",
      tabSize: "4",
      WebkitHyphens: "none",
      MozHyphens: "none",
      msHyphens: "none",
      hyphens: "none",
      padding: "1em",
      margin: ".5em 0",
      overflow: "auto",
      borderRadius: "0.5rem",
    },
    punctuation: {
      color: "#c5c8c6",
    },
    operator: {
      color: "#ff79c6",
    },
    keyword: {
      color: "#ff79c6",
    },
    number: {
      color: "#bd93f9",
    },
  };

  return (
    <SyntaxHighlighter className={"language-pre text-lg"} language="jsx" style={customStyle}>
      {codeString}
    </SyntaxHighlighter>
  );
}
