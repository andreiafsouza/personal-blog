"use client";
import React from "react";
import CodeHighlighter from "@/app/components/CodeHighlighter";

const CodeParser = ({ codeString }) => {
  const high = <CodeHighlighter codeString={codeString} />;

  return high;
};

export default CodeParser;
