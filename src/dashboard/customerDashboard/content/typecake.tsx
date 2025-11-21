// src/dashboard/customerDashboard/types.ts

export type TypeCake = {
  CakeID: number;
  DesignID: number;
  Name: string;
  Flavor: string;
  Size: "Small" | "Medium" | "Large";
  Price: number;
  ImageUrl: string;
  Category: string;
  Availability: boolean;
  Description?: string;
};

export type TypeDesign = {
  DesignID: number;
  DesignName: string;
  BaseFlavor: string;
  Size: "Small" | "Medium" | "Large";
  BasePrice: number;
  ImageUrl: string;
  Category: string;
  Description?: string;
  Availability: boolean;
};

export type TypeOrder = {
  Id: number;
  userid: number; 
  DesignId?: number;
  CakeID?: number;
  Size: "Small" | "Medium" | "Large";
  Flavor: string;
  Message: string;
  DeliveryDate: string; 
  Notes?: string;
  ExtendedDescription?: string;
  SampleImages?: string; 
  ColorPreferences?: string; 
  Status: "Pending" | "Processing" | "Completed" | "Cancelled";
  Price: number;
  CreatedAt: string;
  UpdatedAt?: string;
};

