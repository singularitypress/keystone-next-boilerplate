import { config, list } from "@keystone-6/core";
import { Post, User } from "./cms/lists";
import { withAuth, session } from "./cms/auth";

export default config(
  withAuth({
    db: {
      provider: "sqlite",
      url: "file:./app.db",
    },
    experimental: {
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },
    lists: { Post, User },
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
  }),
);
