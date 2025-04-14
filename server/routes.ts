import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-fixed";
import { z } from "zod";
import { 
  insertPropertySchema, insertUserSchema, insertInvestmentProjectSchema, 
  insertPropertyManagementSchema, insertTestimonialSchema, insertPropertyImageSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Property routes
  app.get("/api/properties", async (_req: Request, res: Response) => {
    try {
      const properties = await storage.getProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to get properties" });
    }
  });

  app.get("/api/properties/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to get property" });
    }
  });

  app.post("/api/properties", async (req: Request, res: Response) => {
    try {
      const propertyData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(propertyData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid property data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create property" });
      }
    }
  });

  app.put("/api/properties/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const propertyData = req.body;
      const property = await storage.updateProperty(id, propertyData);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to update property" });
    }
  });

  app.delete("/api/properties/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProperty(id);
      if (!success) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete property" });
    }
  });

  // Property Images routes
  app.get("/api/properties/:propertyId/images", async (req: Request, res: Response) => {
    try {
      const propertyId = parseInt(req.params.propertyId);
      const images = await storage.getPropertyImages(propertyId);
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to get property images" });
    }
  });

  app.post("/api/property-images", async (req: Request, res: Response) => {
    try {
      const imageData = insertPropertyImageSchema.parse(req.body);
      const image = await storage.addPropertyImage(imageData);
      res.status(201).json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid image data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to add property image" });
      }
    }
  });

  // Investment Project routes
  app.get("/api/investment-projects", async (_req: Request, res: Response) => {
    try {
      const projects = await storage.getInvestmentProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to get investment projects" });
    }
  });

  app.get("/api/investment-projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getInvestmentProject(id);
      if (!project) {
        return res.status(404).json({ message: "Investment project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to get investment project" });
    }
  });

  app.post("/api/investment-projects", async (req: Request, res: Response) => {
    try {
      const projectData = insertInvestmentProjectSchema.parse(req.body);
      const project = await storage.createInvestmentProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid project data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create investment project" });
      }
    }
  });

  app.put("/api/investment-projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const projectData = req.body;
      const project = await storage.updateInvestmentProject(id, projectData);
      if (!project) {
        return res.status(404).json({ message: "Investment project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to update investment project" });
    }
  });

  // Property Management routes
  app.get("/api/property-management", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.query.userId as string);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const managements = await storage.getPropertyManagements(userId);
      res.json(managements);
    } catch (error) {
      res.status(500).json({ message: "Failed to get property managements" });
    }
  });

  app.get("/api/property-management/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const management = await storage.getPropertyManagement(id);
      if (!management) {
        return res.status(404).json({ message: "Property management not found" });
      }
      res.json(management);
    } catch (error) {
      res.status(500).json({ message: "Failed to get property management" });
    }
  });

  app.post("/api/property-management", async (req: Request, res: Response) => {
    try {
      const managementData = insertPropertyManagementSchema.parse(req.body);
      const management = await storage.createPropertyManagement(managementData);
      res.status(201).json(management);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid management data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create property management" });
      }
    }
  });

  // Testimonials routes
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to get testimonials" });
    }
  });

  app.post("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create testimonial" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
