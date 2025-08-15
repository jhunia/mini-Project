import {
  Wifi,
  Waves,
  Dumbbell,
  Car,
  PawPrint,
  Tv,
  Thermometer,
  Cigarette,
  Cable,
  Maximize,
  Bath,
  Phone,
  Sprout,
  LandPlot,
  Hammer,
  Bus,
  Mountain,
  VolumeX,
  Home,
  Warehouse,
  Building,
  Castle,
  Trees,
  LucideIcon,
} from "lucide-react";

export enum AmenityEnum {
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Dishwasher = "Dishwasher",
  HighSpeedInternet = "HighSpeedInternet",
  HardwoodFloors = "HardwoodFloors",
  WalkInClosets = "WalkInClosets",
  Microwave = "Microwave",
  Refrigerator = "Refrigerator",
  Gym = "Gym",
  Parking = "Parking",
  PetsAllowed = "PetsAllowed",
  WiFi = "WiFi",
}

export const AmenityIcons: Record<AmenityEnum, LucideIcon> = {
  [AmenityEnum.WasherDryer]: Waves,
  [AmenityEnum.AirConditioning]: Thermometer,
  [AmenityEnum.Dishwasher]: Waves,
  [AmenityEnum.HighSpeedInternet]: Wifi,
  [AmenityEnum.HardwoodFloors]: Home,
  [AmenityEnum.WalkInClosets]: Maximize,
  [AmenityEnum.Microwave]: Tv,
  [AmenityEnum.Refrigerator]: Thermometer,
  [AmenityEnum.Gym]: Dumbbell,
  [AmenityEnum.Parking]: Car,
  [AmenityEnum.PetsAllowed]: PawPrint,
  [AmenityEnum.WiFi]: Wifi,
};

export enum HighlightEnum {
  HighSpeedInternetAccess = "HighSpeedInternetAccess",
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Heating = "Heating",
  SmokeFree = "SmokeFree",
  CableReady = "CableReady",
  SatelliteTV = "SatelliteTV",
  DoubleVanities = "DoubleVanities",
  TubShower = "TubShower",
  Intercom = "Intercom",
  SprinklerSystem = "SprinklerSystem",
  RecentlyRenovated = "RecentlyRenovated",
  CloseToTransit = "CloseToTransit",
  GreatView = "GreatView",
  QuietNeighborhood = "QuietNeighborhood",
}

export const HighlightIcons: Record<HighlightEnum, LucideIcon> = {
  [HighlightEnum.HighSpeedInternetAccess]: Wifi,
  [HighlightEnum.WasherDryer]: Waves,
  [HighlightEnum.AirConditioning]: Thermometer,
  [HighlightEnum.Heating]: Thermometer,
  [HighlightEnum.SmokeFree]: Cigarette,
  [HighlightEnum.CableReady]: Cable,
  [HighlightEnum.SatelliteTV]: Tv,
  [HighlightEnum.DoubleVanities]: Maximize,
  [HighlightEnum.TubShower]: Bath,
  [HighlightEnum.Intercom]: Phone,
  [HighlightEnum.SprinklerSystem]: Sprout,
  [HighlightEnum.RecentlyRenovated]: Hammer,
  [HighlightEnum.CloseToTransit]: Bus,
  [HighlightEnum.GreatView]: Mountain,
  [HighlightEnum.QuietNeighborhood]: VolumeX,
};

export enum PropertyTypeEnum {
  Rooms = "Rooms",
  Tinyhouse = "Tinyhouse",
  Apartment = "Apartment",
  Villa = "Villa",
  Townhouse = "Townhouse",
  Cottage = "Cottage",
  Land = "Land",
}

export const PropertyTypeIcons: Record<PropertyTypeEnum, LucideIcon> = {
  [PropertyTypeEnum.Rooms]: Home,
  [PropertyTypeEnum.Tinyhouse]: Warehouse,
  [PropertyTypeEnum.Apartment]: Building,
  [PropertyTypeEnum.Villa]: Castle,
  [PropertyTypeEnum.Townhouse]: Home,
  [PropertyTypeEnum.Cottage]: Trees,
  [PropertyTypeEnum.Land]: LandPlot,
};

// Add this constant at the end of the file
export const NAVBAR_HEIGHT = 52; // in pixels

// Test users for development
export const testUsers = {
  tenant: {
    username: "Carol White",
    userId: "us-east-2:76543210-90ab-cdef-1234-567890abcdef",
    signInDetails: {
      loginId: "carol.white@example.com",
      authFlowType: "USER_SRP_AUTH",
    },
  },
  tenantRole: "tenant",
  manager: {
    username: "John Smith",
    userId: "us-east-2:12345678-90ab-cdef-1234-567890abcdef",
    signInDetails: {
      loginId: "john.smith@example.com",
      authFlowType: "USER_SRP_AUTH",
    },
  },
  managerRole: "manager",
};
