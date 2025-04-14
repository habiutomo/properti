import type { SessionData } from "express-session";
import {
  users, properties, propertyImages, investmentProjects, propertyManagement, testimonials,
  type User, type InsertUser,
  type Property, type InsertProperty,
  type PropertyImage, type InsertPropertyImage,
  type InvestmentProject, type InsertInvestmentProject,
  type PropertyManagement, type InsertPropertyManagement,
  type Testimonial, type InsertTestimonial
} from "@shared/schema";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";

// Interface untuk session store
export interface ISessionStore {
  all: (callback: (err: any, sessions?: any) => void) => void;
  destroy: (sid: string, callback: (err?: any) => void) => void;
  clear: (callback: (err?: any) => void) => void;
  length: (callback: (err: any, length?: number) => void) => void;
  get: (sid: string, callback: (err: any, session?: SessionData | null) => void) => void;
  set: (sid: string, session: SessionData, callback?: (err?: any) => void) => void;
  touch: (sid: string, session: SessionData, callback?: (err?: any) => void) => void;
}

export interface IStorage {
  // User CRUD
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateStripeCustomerId(userId: number, customerId: string): Promise<User>;
  updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User>;
  
  // Property CRUD
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getPropertiesByUser(userId: number): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  // Property Images CRUD
  getPropertyImages(propertyId: number): Promise<PropertyImage[]>;
  addPropertyImage(image: InsertPropertyImage): Promise<PropertyImage>;
  deletePropertyImage(id: number): Promise<boolean>;
  
  // Investment Projects CRUD
  getInvestmentProjects(): Promise<InvestmentProject[]>;
  getInvestmentProject(id: number): Promise<InvestmentProject | undefined>;
  getInvestmentProjectsByUser(userId: number): Promise<InvestmentProject[]>;
  createInvestmentProject(project: InsertInvestmentProject): Promise<InvestmentProject>;
  updateInvestmentProject(id: number, project: Partial<InsertInvestmentProject>): Promise<InvestmentProject | undefined>;
  deleteInvestmentProject(id: number): Promise<boolean>;
  
  // Property Management CRUD
  getPropertyManagements(userId: number): Promise<PropertyManagement[]>;
  getPropertyManagement(id: number): Promise<PropertyManagement | undefined>;
  createPropertyManagement(management: InsertPropertyManagement): Promise<PropertyManagement>;
  updatePropertyManagement(id: number, management: Partial<InsertPropertyManagement>): Promise<PropertyManagement | undefined>;
  deletePropertyManagement(id: number): Promise<boolean>;
  
  // Testimonials CRUD
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Session store
  sessionStore: ISessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private propertyImages: Map<number, PropertyImage>;
  private investmentProjects: Map<number, InvestmentProject>;
  private propertyManagements: Map<number, PropertyManagement>;
  private testimonials: Map<number, Testimonial>;
  
  private currentUserId: number;
  private currentPropertyId: number;
  private currentPropertyImageId: number;
  private currentInvestmentProjectId: number;
  private currentPropertyManagementId: number;
  private currentTestimonialId: number;
  
  public sessionStore: ISessionStore;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.propertyImages = new Map();
    this.investmentProjects = new Map();
    this.propertyManagements = new Map();
    this.testimonials = new Map();
    
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentPropertyImageId = 1;
    this.currentInvestmentProjectId = 1;
    this.currentPropertyManagementId = 1;
    this.currentTestimonialId = 1;
    
    // Initialize with some sample data
    this.initializeTestimonials();
    
    // Membuat session store sederhana
    this.sessionStore = {
      // Implementasi minimalistik
      all: (cb: (err: any, sessions?: any) => void) => cb(null, {}),
      destroy: (sid: string, cb: (err?: any) => void) => cb(),
      clear: (cb: (err?: any) => void) => cb(),
      length: (cb: (err: any, length?: number) => void) => cb(null, 0),
      get: (sid: string, cb: (err: any, session?: SessionData | null) => void) => cb(null),
      set: (sid: string, session: SessionData, cb?: (err?: any) => void) => { if (cb) cb(); },
      touch: (sid: string, session: SessionData, cb?: (err?: any) => void) => { if (cb) cb(); }
    };
  }
  
  private initializeTestimonials() {
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Siti Badriah",
        role: "Property Developer",
        content: "PropertyHub helped me find investors for my development project in just 3 weeks. The platform is intuitive and the support team is exceptional. Highly recommend!",
        rating: 5
      },
      {
        name: "Joko Widodo",
        role: "Real Estate Investor",
        content: "As an investor, I've used many platforms, but PropertyHub offers the most comprehensive information and due diligence reports. I've invested in 3 projects so far with excellent returns.",
        rating: 5
      },
      {
        name: "Dewi Pratiwi",
        role: "Property Owner",
        content: "Managing my rental properties has become so much easier with PropertyHub. The payment tracking, maintenance requests, and tenant communication features save me hours every week.",
        rating: 4
      }
    ];
    
    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  // User CRUD operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      stripeCustomerId: null,
      stripeSubscriptionId: null
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error('User not found');
    
    const updatedUser: User = {
      ...user,
      stripeCustomerId: customerId
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  async updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error('User not found');
    
    const updatedUser: User = {
      ...user,
      stripeCustomerId: stripeInfo.stripeCustomerId,
      stripeSubscriptionId: stripeInfo.stripeSubscriptionId
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  // Property CRUD operations
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }
  
  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }
  
  async getPropertiesByUser(userId: number): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.userId === userId
    );
  }
  
  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const now = new Date();
    const newProperty: Property = { 
      ...property, 
      id, 
      createdAt: now,
      status: property.status || null,
      bedrooms: property.bedrooms || null,
      bathrooms: property.bathrooms || null,
      area: property.area || null,
      hasVirtualTour: property.hasVirtualTour || null,
      virtualTourUrl: property.virtualTourUrl || null
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }
  
  async updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const existingProperty = this.properties.get(id);
    if (!existingProperty) return undefined;
    
    const updatedProperty = { ...existingProperty, ...property };
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }
  
  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }
  
  // Property Images CRUD operations
  async getPropertyImages(propertyId: number): Promise<PropertyImage[]> {
    return Array.from(this.propertyImages.values()).filter(
      (image) => image.propertyId === propertyId
    );
  }
  
  async addPropertyImage(image: InsertPropertyImage): Promise<PropertyImage> {
    const id = this.currentPropertyImageId++;
    const newImage: PropertyImage = { ...image, id };
    this.propertyImages.set(id, newImage);
    return newImage;
  }
  
  async deletePropertyImage(id: number): Promise<boolean> {
    return this.propertyImages.delete(id);
  }
  
  // Investment Projects CRUD operations
  async getInvestmentProjects(): Promise<InvestmentProject[]> {
    return Array.from(this.investmentProjects.values());
  }
  
  async getInvestmentProject(id: number): Promise<InvestmentProject | undefined> {
    return this.investmentProjects.get(id);
  }
  
  async getInvestmentProjectsByUser(userId: number): Promise<InvestmentProject[]> {
    return Array.from(this.investmentProjects.values()).filter(
      (project) => project.userId === userId
    );
  }
  
  async createInvestmentProject(project: InsertInvestmentProject): Promise<InvestmentProject> {
    const id = this.currentInvestmentProjectId++;
    const now = new Date();
    const newProject: InvestmentProject = { 
      ...project, 
      id, 
      createdAt: now,
      status: project.status || null,
      currentAmount: "0" 
    };
    this.investmentProjects.set(id, newProject);
    return newProject;
  }
  
  async updateInvestmentProject(id: number, project: Partial<InsertInvestmentProject>): Promise<InvestmentProject | undefined> {
    const existingProject = this.investmentProjects.get(id);
    if (!existingProject) return undefined;
    
    const updatedProject = { ...existingProject, ...project };
    this.investmentProjects.set(id, updatedProject);
    return updatedProject;
  }
  
  async deleteInvestmentProject(id: number): Promise<boolean> {
    return this.investmentProjects.delete(id);
  }
  
  // Property Management CRUD operations
  async getPropertyManagements(userId: number): Promise<PropertyManagement[]> {
    return Array.from(this.propertyManagements.values()).filter(
      (management) => management.userId === userId
    );
  }
  
  async getPropertyManagement(id: number): Promise<PropertyManagement | undefined> {
    return this.propertyManagements.get(id);
  }
  
  async createPropertyManagement(management: InsertPropertyManagement): Promise<PropertyManagement> {
    const id = this.currentPropertyManagementId++;
    const newManagement: PropertyManagement = { 
      ...management, 
      id,
      tenantName: management.tenantName || null,
      tenantEmail: management.tenantEmail || null,
      tenantPhone: management.tenantPhone || null,
      leaseStart: management.leaseStart || null,
      leaseEnd: management.leaseEnd || null,
      monthlyRent: management.monthlyRent || null,
      isOccupied: management.isOccupied || null,
      lastPaymentDate: management.lastPaymentDate || null
    };
    this.propertyManagements.set(id, newManagement);
    return newManagement;
  }
  
  async updatePropertyManagement(id: number, management: Partial<InsertPropertyManagement>): Promise<PropertyManagement | undefined> {
    const existingManagement = this.propertyManagements.get(id);
    if (!existingManagement) return undefined;
    
    const updatedManagement = { ...existingManagement, ...management };
    this.propertyManagements.set(id, updatedManagement);
    return updatedManagement;
  }
  
  async deletePropertyManagement(id: number): Promise<boolean> {
    return this.propertyManagements.delete(id);
  }
  
  // Testimonials CRUD operations
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
}

// Database implementation - akan digunakan nanti setelah aplikasi berjalan dengan baik
export class DatabaseStorage implements IStorage {
  public sessionStore: ISessionStore;
  
  constructor() {
    // Session store sederhana untuk sementara
    this.sessionStore = {
      all: (cb: (err: any, sessions?: any) => void) => cb(null, {}),
      destroy: (sid: string, cb: (err?: any) => void) => cb(),
      clear: (cb: (err?: any) => void) => cb(),
      length: (cb: (err: any, length?: number) => void) => cb(null, 0),
      get: (sid: string, cb: (err: any, session?: SessionData | null) => void) => cb(null),
      set: (sid: string, session: SessionData, cb?: (err?: any) => void) => { if (cb) cb(); },
      touch: (sid: string, session: SessionData, cb?: (err?: any) => void) => { if (cb) cb(); }
    };
  }
  
  // User CRUD operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ stripeCustomerId: customerId })
      .where(eq(users.id, userId))
      .returning();
    
    return user;
  }
  
  async updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId: stripeInfo.stripeCustomerId,
        stripeSubscriptionId: stripeInfo.stripeSubscriptionId
      })
      .where(eq(users.id, userId))
      .returning();
    
    return user;
  }
  
  // Property CRUD operations
  async getProperties(): Promise<Property[]> {
    return db.select().from(properties);
  }
  
  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }
  
  async getPropertiesByUser(userId: number): Promise<Property[]> {
    return db.select().from(properties).where(eq(properties.userId, userId));
  }
  
  async createProperty(property: InsertProperty): Promise<Property> {
    const [newProperty] = await db.insert(properties).values(property).returning();
    return newProperty;
  }
  
  async updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const [updatedProperty] = await db
      .update(properties)
      .set(property)
      .where(eq(properties.id, id))
      .returning();
    
    return updatedProperty || undefined;
  }
  
  async deleteProperty(id: number): Promise<boolean> {
    const result = await db.delete(properties).where(eq(properties.id, id));
    return Boolean(result);
  }
  
  // Property Images CRUD operations
  async getPropertyImages(propertyId: number): Promise<PropertyImage[]> {
    return db.select().from(propertyImages).where(eq(propertyImages.propertyId, propertyId));
  }
  
  async addPropertyImage(image: InsertPropertyImage): Promise<PropertyImage> {
    const [newImage] = await db.insert(propertyImages).values(image).returning();
    return newImage;
  }
  
  async deletePropertyImage(id: number): Promise<boolean> {
    const result = await db.delete(propertyImages).where(eq(propertyImages.id, id));
    return Boolean(result);
  }
  
  // Investment Projects CRUD operations
  async getInvestmentProjects(): Promise<InvestmentProject[]> {
    return db.select().from(investmentProjects);
  }
  
  async getInvestmentProject(id: number): Promise<InvestmentProject | undefined> {
    const [project] = await db.select().from(investmentProjects).where(eq(investmentProjects.id, id));
    return project || undefined;
  }
  
  async getInvestmentProjectsByUser(userId: number): Promise<InvestmentProject[]> {
    return db.select().from(investmentProjects).where(eq(investmentProjects.userId, userId));
  }
  
  async createInvestmentProject(project: InsertInvestmentProject): Promise<InvestmentProject> {
    const [newProject] = await db.insert(investmentProjects).values(project).returning();
    return newProject;
  }
  
  async updateInvestmentProject(id: number, project: Partial<InsertInvestmentProject>): Promise<InvestmentProject | undefined> {
    const [updatedProject] = await db
      .update(investmentProjects)
      .set(project)
      .where(eq(investmentProjects.id, id))
      .returning();
    
    return updatedProject || undefined;
  }
  
  async deleteInvestmentProject(id: number): Promise<boolean> {
    const result = await db.delete(investmentProjects).where(eq(investmentProjects.id, id));
    return Boolean(result);
  }
  
  // Property Management CRUD operations
  async getPropertyManagements(userId: number): Promise<PropertyManagement[]> {
    return db.select().from(propertyManagement).where(eq(propertyManagement.userId, userId));
  }
  
  async getPropertyManagement(id: number): Promise<PropertyManagement | undefined> {
    const [management] = await db.select().from(propertyManagement).where(eq(propertyManagement.id, id));
    return management || undefined;
  }
  
  async createPropertyManagement(management: InsertPropertyManagement): Promise<PropertyManagement> {
    const [newManagement] = await db.insert(propertyManagement).values(management).returning();
    return newManagement;
  }
  
  async updatePropertyManagement(id: number, management: Partial<InsertPropertyManagement>): Promise<PropertyManagement | undefined> {
    const [updatedManagement] = await db
      .update(propertyManagement)
      .set(management)
      .where(eq(propertyManagement.id, id))
      .returning();
    
    return updatedManagement || undefined;
  }
  
  async deletePropertyManagement(id: number): Promise<boolean> {
    const result = await db.delete(propertyManagement).where(eq(propertyManagement.id, id));
    return Boolean(result);
  }
  
  // Testimonials CRUD operations
  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials);
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }
}

// Sementara gunakan storage memori untuk memastikan aplikasi berjalan
export const storage = new MemStorage();