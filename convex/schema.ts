import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		userId: v.string(),
		name: v.string(),
		profileImage: v.string(),
	}),
	docs: defineTable({
		imageUrl: v.string(),
		note: v.string(),
		tags: v.array(v.string()),
		date: v.string(),
		userId: v.id("users"),
	}).index("by_userId", ["userId"]),
});
