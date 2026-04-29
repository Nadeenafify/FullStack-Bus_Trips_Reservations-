export type Trip = {
  tripId: number;
  sourceCityId: number;
  destenationCityId: number;
  departureTime: string;
  arrivalTime: string;
  price: number;
  destinationEn: string;
  destinationAr: string;
  sourceEn: string;
  sourceAr: string;
};

export type UseTripsParams = {
  fromCity: number;
  toCity: number;
  date: string;

  minPrice?: string;
  maxPrice?: string;
  time?: string;
  amenities?: string[];
};