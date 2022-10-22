import draftToHtmlPuri from "draftjs-to-html";

export const parseTextEditorToHtml = (description?: string) =>
  draftToHtmlPuri(JSON.parse(description || "{}"))
    .replaceAll("<p></p>", '<p style="display: inline-block"></p>')
    .replaceAll(
      `<ol>`,
      `<ol style="list-style-type: decimal; padding-left: 40px;">`
    )
    .replaceAll(
      `<ul>`,
      `<ul style="list-style-type: disc; padding-left: 40px;">`
    )
    .replaceAll("background-color: rgb(255,255,255);", "");

export const isValidLink = (link: string) =>
  // eslint-disable-next-line
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
    link?.trim()
  );
