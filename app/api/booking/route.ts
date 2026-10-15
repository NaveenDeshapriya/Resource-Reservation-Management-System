import connection from "@/app/lib/db";
import { Reservation } from "@/app/util/user";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";

export async function GET() {

  const available: number = 2;

  try {

    const results: QueryResult = await connection.query("SELECT *FROM room WHERE status_id=$1", [available]);



    if (results.rows.length > 0) {

      return NextResponse.json({
        "status": true
      });

    } else {

      return NextResponse.json({
        "status": false,
        "message": "Sorry, all slots are fully booked."
      });

    }


  } catch (error) {
    console.log(error);


  }


}


export async function POST(request: Request) {

  const requestBody = await request.json();
  const { reservationNo } = requestBody;
  const available: number = 2;
  const finish: number = 5;
  try {
    const result: QueryResult = await connection.query("SELECT *FROM reservation WHERE reservation_no=$1", [reservationNo]);

    const reservation = result.rows[0];
    const room_no: number = reservation.room_no;

    await connection.query("UPDATE room SET status_id=$1 WHERE room_no=$2", [available, room_no]);
    await connection.query("UPDATE reservation SET status_id=$1 WHERE reservation_no=$2", [finish, reservationNo]);
   
    return NextResponse.json({
      "status": true,
      "message": "Reservation finish success."
    })


  } catch (error) {
    console.log(error);


  }

}
