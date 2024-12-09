export interface Vehicle {
  id: number,
  plate: string,
  chassis: string,
  renavam: string,
  brandId: number,
  createdAt: Date,
  updatedAt: Date | null,
  deletedAt: Date | null,
  brand: {
    id: number,
    name: string,
    model: string,
    year: string,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  }
}

export interface CreateVehicle {
  plate: string,
  chassis: string,
  renavam: string,
  brandId?: number,
  brand?: {
    name: string,
    model: string,
    year: string,
  }
}
