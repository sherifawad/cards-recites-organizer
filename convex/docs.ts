import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

export const saveStorageIds = mutation({
	// You can customize these as you like
	args: {
		uploaded: v.array(
			v.object({
				storageId: v.string(),
			}),
		),

		note: v.string(),
		tags: v.array(v.string()),
		date: v.string(),
	},
	handler: async (ctx, args) => {
		// use `args` and/or `ctx.auth` to authorize the user
		// ...

		// Save the storageId to the database using `insert`
		ctx.db.insert("docs", {
			imagesUrls: args.uploaded.map(({ storageId }) => storageId),
			note: args.note,
			date: args.date,
			tags: args.tags,
			userId: "dfdf" as Id<"users">,
		});
	},
});
