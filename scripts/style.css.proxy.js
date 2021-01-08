// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ":root {\n  font-size: 1em;\n  box-sizing: border-box;\n}\n\n*,\n::before,\n::after {\n  box-sizing: inherit;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}