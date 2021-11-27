import fetch from "node-fetch";
import { Handler } from "@netlify/functions";

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

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
