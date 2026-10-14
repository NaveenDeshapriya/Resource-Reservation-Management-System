import connection from "@/app/lib/db";
import { getReservationNumber } from "@/app/util/randomReservationNumber";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";
import { Reservation } from "../../util/user";


export async function POST(request: Request) {

    const requestBody: any = await request.json();


    const { firstname, lastname, email, details } = requestBody;
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstname == "") {
        return NextResponse.json({
            "status": false,
            "message": "Enter firstname"
        });
    } else if (lastname == "") {
        return NextResponse.json({
            "status": false,
            "message": "Enter lastname"
        });
    } else if (email == "") {
        return NextResponse.json({
            "status": false,
            "message": "Enter email"
        });
    } else if (!emailRegex.test(email)) {
        return NextResponse.json({
            "status": false,
            "message": "Enter valid email"
        });

    } else if (details == "") {
        return NextResponse.json({
            "status": false,
            "message": "Enter details"
        });
    } else {

        const reservationNumber: string = getReservationNumber();
        const reservationDate: string = new Date().toLocaleString("en-US");
        const booked: number = 1;



        try {

            await connection.query("INSERT INTO reservation (reservation_no,first_name,last_name,email,detail,reservation_date,status_id) VALUES ($1,$2,$3,$4,$5,$6,$7)"
                , [reservationNumber, firstname, lastname, email, details, reservationDate, booked]);


            return NextResponse.json({
                "status": true,
                "reservationNo": reservationNumber,
                "message": "Reservation confirmed"
            });

        } catch (error) {

            return NextResponse.error();

        }


    }




}

export async function GET() {

    let status: string = "Booked";


    try {

        const result: QueryResult = await connection.
            query("SELECT * FROM reservation INNER JOIN status ON reservation.status_id=status.id ORDER BY status.type=$1 DESC", [status]);

        

        return NextResponse.json({
            "status": true,
            "reservationList": result.rows

        });

    } catch (error) {

        return NextResponse.json({
            "status": false,
            "message": "Not found..."
        });
    }




}