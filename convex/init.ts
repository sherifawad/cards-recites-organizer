import { internalMutation, type MutationCtx } from "./_generated/server";

export default internalMutation({
	handler: async (ctx: MutationCtx) => {
		// If this project already has a populated database, do nothing
		const anyMessage = await ctx.db.query("users").first();
		if (anyMessage) return;
		// add default user
		await ctx.db.insert("users", {
			profileImage: "https://avatars.githubusercontent.com/u/8983617",
			name: "sherif awad",
			userId: "vfsfs",
		});
	},
});
