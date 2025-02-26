import type { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints";

export const buildTableRow = (content: string): BlockObjectRequest => {
  return {
    object: "block",
    type: "table_row",
    table_row: {
      cells: [
        [
          {
            type: "text",
            text: {
              content,
            },
          },
        ],
      ],
    },
  };
};
