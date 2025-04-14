import { pgTable, text, serial, integer, boolean, numeric, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number"),
  isLandlord: boolean("is_landlord").default(false),
  isInvestor: boolean("is_investor").default(false),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
});

// Menunda relasi hingga semua tabel didefinisikan

// Property table
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  propertyType: text("property_type").notNull(), // house, apartment, land, commercial
  purpose: text("purpose").notNull(), // sale, rent
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  area: numeric("area"),
  userId: integer("user_id").notNull(),
  hasVirtualTour: boolean("has_virtual_tour").default(false),
  featuredImage: text("featured_image").notNull(),
  status: text("status").default("available"), // available, sold, rented
  createdAt: timestamp("created_at").defaultNow(),
});

// Property Images table
export const propertyImages = pgTable("property_images", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull(),
  imageUrl: text("image_url").notNull(),
});

// Investment Projects table
export const investmentProjects = pgTable("investment_projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  targetAmount: numeric("target_amount").notNull(),
  currentAmount: numeric("current_amount").default("0"),
  roi: numeric("roi").notNull(), // expected return on investment
  duration: integer("duration").notNull(), // duration in months
  minInvestment: numeric("min_investment").notNull(),
  location: text("location").notNull(),
  projectType: text("project_type").notNull(), // commercial, residential, mixed-use
  featuredImage: text("featured_image").notNull(),
  endDate: timestamp("end_date").notNull(),
  userId: integer("user_id").notNull(),
  status: text("status").default("active"), // active, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

// Property Management table
export const propertyManagement = pgTable("property_management", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull(),
  tenantName: text("tenant_name"),
  tenantEmail: text("tenant_email"),
  tenantPhone: text("tenant_phone"),
  leaseStart: timestamp("lease_start"),
  leaseEnd: timestamp("lease_end"),
  monthlyRent: numeric("monthly_rent"),
  isOccupied: boolean("is_occupied").default(false),
  lastPaymentDate: timestamp("last_payment_date"),
  userId: integer("user_id").notNull(),
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  phoneNumber: true,
  isLandlord: true,
  isInvestor: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
});

export const insertPropertyImageSchema = createInsertSchema(propertyImages).omit({
  id: true,
});

export const insertInvestmentProjectSchema = createInsertSchema(investmentProjects).omit({
  id: true,
  currentAmount: true,
  createdAt: true,
});

export const insertPropertyManagementSchema = createInsertSchema(propertyManagement).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type PropertyImage = typeof propertyImages.$inferSelect;
export type InsertPropertyImage = z.infer<typeof insertPropertyImageSchema>;

export type InvestmentProject = typeof investmentProjects.$inferSelect;
export type InsertInvestmentProject = z.infer<typeof insertInvestmentProjectSchema>;

export type PropertyManagement = typeof propertyManagement.$inferSelect;
export type InsertPropertyManagement = z.infer<typeof insertPropertyManagementSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
