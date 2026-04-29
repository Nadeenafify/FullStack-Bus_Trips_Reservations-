export type Reservation = {
  tripId: number;
  price: number;
  seats: string;
  sourceCityEn: string;
  destinationCityEn: string;
  sourceCityAr?: string;
  destinationCityAr?: string;
};
export type MYReservationCard = {
  tripId: number;
  price: number;
  seats: string;
  sourceCityEn: string;
  destinationCityEn: string;
  sourceCityAr?: string;
  destinationCityAr?: string;
};