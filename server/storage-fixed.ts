import type { SessionData } from "express-session";
import { 
  type User, type Property, type PropertyImage, 
  type InvestmentProject, type PropertyManagement,
  type Testimonial,
  type InsertUser,
  type InsertProperty,
  type InsertPropertyImage,
  type InsertInvestmentProject,
  type InsertPropertyManagement,
  type InsertTestimonial
} from "@shared/schema";

// In-memory storage
const users: User[] = [];
const properties: Property[] = [];
const propertyImages: PropertyImage[] = [];
const investmentProjects: InvestmentProject[] = [];
const propertyManagements: PropertyManagement[] = [];
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Siti Badriah",
    role: "Property Developer",
    content: "Platform ini sangat membantu dalam mengelola properti investasi saya.",
    rating: 5
  },
  {
    id: 2,
    name: "Budi Santoso",
    role: "Investor",
    content: "Saya telah berinvestasi di beberapa properti melalui platform ini. Hasilnya sangat memuaskan.",
    rating: 5
  }
];

let nextId = {
  users: 1,
  properties: 1,
  propertyImages: 1,
  investmentProjects: 1,
  propertyManagements: 1,
  testimonials: 3
};

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
  getUser(id: number): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;
  updateStripeCustomerId(userId: number, customerId: string): Promise<User>;
  updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId: string }): Promise<User>;

  // Property CRUD
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | null>;
  getPropertiesByUser(userId: number): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | null>;
  deleteProperty(id: number): Promise<boolean>;

  // Property Images CRUD
  getPropertyImages(propertyId: number): Promise<PropertyImage[]>;
  addPropertyImage(image: InsertPropertyImage): Promise<PropertyImage>;
  deletePropertyImage(id: number): Promise<boolean>;

  // Investment Projects CRUD
  getInvestmentProjects(): Promise<InvestmentProject[]>;
  getInvestmentProject(id: number): Promise<InvestmentProject | null>;
  getInvestmentProjectsByUser(userId: number): Promise<InvestmentProject[]>;
  createInvestmentProject(project: InsertInvestmentProject): Promise<InvestmentProject>;
  updateInvestmentProject(id: number, project: Partial<InsertInvestmentProject>): Promise<InvestmentProject | null>;
  deleteInvestmentProject(id: number): Promise<boolean>;

  // Property Management CRUD
  getPropertyManagements(userId: number): Promise<PropertyManagement[]>;
  getPropertyManagement(id: number): Promise<PropertyManagement | null>;
  createPropertyManagement(management: InsertPropertyManagement): Promise<PropertyManagement>;
  updatePropertyManagement(id: number, management: Partial<InsertPropertyManagement>): Promise<PropertyManagement | null>;
  deletePropertyManagement(id: number): Promise<boolean>;

  // Testimonials CRUD
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Session store
  sessionStore: ISessionStore;
}

export const storage = {
  // User operations
  async createUser(userData: Omit<User, "id">): Promise<User> {
    const user = { ...userData, id: nextId.users++ };
    users.push(user);
    return user;
  },

  async getUser(id: number): Promise<User | null> {
    return users.find(u => u.id === id) || null;
  },
  async getUserByUsername(username: string): Promise<User | null> {
    return users.find(u => u.username === username) || null;
  },
  async updateStripeCustomerId(userId: number, customerId: string): Promise<User> {
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    const updatedUser = {...user, stripeCustomerId: customerId};
    const index = users.findIndex(u => u.id === userId);
    users[index] = updatedUser;
    return updatedUser;
  },
  async updateUserStripeInfo(userId: number, stripeInfo: { stripeCustomerId: string; stripeSubscriptionId: string }): Promise<User> {
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    const updatedUser = {...user, ...stripeInfo};
    const index = users.findIndex(u => u.id === userId);
    users[index] = updatedUser;
    return updatedUser;
  },
  // Property operations
  async getProperties(): Promise<Property[]> {
    return properties;
  },

  async getProperty(id: number): Promise<Property | null> {
    return properties.find(p => p.id === id) || null;
  },

  async createProperty(propertyData: Omit<Property, "id">): Promise<Property> {
    const property = { ...propertyData, id: nextId.properties++ };
    properties.push(property);
    return property;
  },

  async updateProperty(id: number, propertyData: Partial<Property>): Promise<Property | null> {
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return null;
    properties[index] = { ...properties[index], ...propertyData };
    return properties[index];
  },

  async deleteProperty(id: number): Promise<boolean> {
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return false;
    properties.splice(index, 1);
    return true;
  },

  // Property Images operations
  async getPropertyImages(propertyId: number): Promise<PropertyImage[]> {
    return propertyImages.filter(img => img.propertyId === propertyId);
  },

  async addPropertyImage(imageData: Omit<PropertyImage, "id">): Promise<PropertyImage> {
    const image = { ...imageData, id: nextId.propertyImages++ };
    propertyImages.push(image);
    return image;
  },
  async deletePropertyImage(id: number): Promise<boolean> {
    const index = propertyImages.findIndex(img => img.id === id);
    if (index === -1) return false;
    propertyImages.splice(index, 1);
    return true;
  },

  // Investment Project operations
  async getInvestmentProjects(): Promise<InvestmentProject[]> {
    return investmentProjects;
  },

  async getInvestmentProject(id: number): Promise<InvestmentProject | null> {
    return investmentProjects.find(p => p.id === id) || null;
  },

  async createInvestmentProject(projectData: Omit<InvestmentProject, "id">): Promise<InvestmentProject> {
    const project = { ...projectData, id: nextId.investmentProjects++ };
    investmentProjects.push(project);
    return project;
  },

  async updateInvestmentProject(id: number, projectData: Partial<InvestmentProject>): Promise<InvestmentProject | null> {
    const index = investmentProjects.findIndex(p => p.id === id);
    if (index === -1) return null;
    investmentProjects[index] = { ...investmentProjects[index], ...projectData };
    return investmentProjects[index];
  },
  async deleteInvestmentProject(id: number): Promise<boolean> {
    const index = investmentProjects.findIndex(p => p.id === id);
    if (index === -1) return false;
    investmentProjects.splice(index, 1);
    return true;
  },

  // Property Management operations
  async getPropertyManagements(userId: number): Promise<PropertyManagement[]> {
    return propertyManagements.filter(pm => pm.userId === userId);
  },

  async getPropertyManagement(id: number): Promise<PropertyManagement | null> {
    return propertyManagements.find(pm => pm.id === id) || null;
  },

  async createPropertyManagement(managementData: Omit<PropertyManagement, "id">): Promise<PropertyManagement> {
    const management = { ...managementData, id: nextId.propertyManagements++ };
    propertyManagements.push(management);
    return management;
  },
  async updatePropertyManagement(id: number, managementData: Partial<PropertyManagement>): Promise<PropertyManagement | null> {
    const index = propertyManagements.findIndex(pm => pm.id === id);
    if (index === -1) return null;
    propertyManagements[index] = { ...propertyManagements[index], ...managementData };
    return propertyManagements[index];
  },
  async deletePropertyManagement(id: number): Promise<boolean> {
    const index = propertyManagements.findIndex(pm => pm.id === id);
    if (index === -1) return false;
    propertyManagements.splice(index, 1);
    return true;
  },

  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return testimonials;
  },

  async createTestimonial(testimonialData: Omit<Testimonial, "id">): Promise<Testimonial> {
    const testimonial = { ...testimonialData, id: nextId.testimonials++ };
    testimonials.push(testimonial);
    return testimonial;
  },
  async getPropertiesByUser(userId: number): Promise<Property[]> {
    return properties.filter(p => p.userId === userId);
  },
  async getInvestmentProjectsByUser(userId: number): Promise<InvestmentProject[]> {
    return investmentProjects.filter(p => p.userId === userId);
  },
  sessionStore: {
    all: (cb: (err: any, sessions?: any) => void) => cb(null, {}),
    destroy: (sid: string, cb: (err?: any) => void) => cb(),
    clear: (cb: (err?: any) => void) => cb(),
    length: (cb: (err: any, length?: number) => void) => cb(null, 0),
    get: (sid: string, cb: (err: any, session?: SessionData | null) => void) => cb(null),
    set: (sid: string, session: SessionData, cb?: (err?: any) => void) => { if (cb) cb(); },
    touch: (sid: string, session: SessionData, cb?: (err?: any) => void) => { if (cb) cb(); }
  }
};