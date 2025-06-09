


export interface Showtime {
    showTimeId: number;
    startTime: string;
    endTime: string;
    price: number;
    movieId: number;
    roomId: number;
    roomName?: string;
    movieTitle? : string;
    seats?: SeatResponse[];
    tickets?: TicketResponse[];
  }
  
  export interface SeatResponse {
    seatId: number;
    seatNumber: string;
    row: string;
    column: number;
  }
  
  export interface TicketResponse {
    ticketId: number;
    seatId: number;
    price: number;
    bookingTime: string;
    status: string;
    userId: string;
  }
  
  



