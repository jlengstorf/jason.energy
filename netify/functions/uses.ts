import fetch from "node-fetch";
import { Handler } from "@netlify/functions";
import { UsedItem } from "../src/types";

type NotionRichTextObject = {
  type: string;
  plain_text: string;
  href?: string;
  annotations: {
    bold: boolean;
    italic: boolean;
  };
};

function notionRichTextToHTML(richText: NotionRichTextObject[]): string {
  const html = richText.reduce((content, obj: NotionRichTextObject) => {
    if (obj.type !== "text") {
      return content;
    }

    let text = obj.plain_text;

    if (obj.annotations.bold) {
      text = `<strong>${text}</strong>`;
    }

    if (obj.annotations.italic) {
      text = `<em>${text}</em>`;
    }

    if (obj.href) {
      text = `<a href="${obj.href}">${text}</a>`;
    }

    return (content += text);
  }, "");

  return html;
}

function parseNotionDatabase(data): UsedItem[] {
  const results = data.results;

  return results.map(
    (result): UsedItem => {
      const {
        name,
        category,
        tags,
        details,
        link,
        sponsored,
      } = result.properties;

      return {
        id: result.id,
        name: name.title[0].plain_text,
        category: category.select.name,
        tags: tags.multi_select.map((tag) => tag.name),
        details: notionRichTextToHTML(details.rich_text),
        link: link.url,
        sponsored: sponsored.checkbox,
      };
    }
  );
}

export const handler: Handler = async () => {
  const response = await fetch(
    "https://api.notion.com/v1/databases/bcd66ab9eb984975ab6765db391f7b8f/query",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_AUTH_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2021-08-16",
      },
    }
  );

  if (!response.ok) {
    console.error(response);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "unable to load data from Notion" }),
    };
  }

  const data = await response.json();
  const items = parseNotionDatabase(data);

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
