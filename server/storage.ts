import {
  users, properties, propertyImages, investmentProjects, 
  propertyManagement, testimonials, type User, type Property, 
  type PropertyImage, type InvestmentProject, type PropertyManagement, 
  type Testimonial, type InsertUser, type InsertProperty, 
  type InsertPropertyImage, type InsertInvestmentProject, 
  type InsertPropertyManagement, type InsertTestimonial
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User CRUD
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
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
      createdAt: now 
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
    const newManagement: PropertyManagement = { ...management, id };
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

export const storage = new MemStorage();
