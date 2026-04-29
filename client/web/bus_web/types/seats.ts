export type Seat = {
  id: number;
  tripId: number;
  rowNumber: number;
  colNumber: number;
  status: "available" | "booked" | "reserved";
  seatNumber:number
};

export type Seats = Seat[];
