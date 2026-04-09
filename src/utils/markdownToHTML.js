import Showdown from "showdown";

const converter = new Showdown.Converter();

export const markdownToHTML = (md) => converter.makeHtml(md);
