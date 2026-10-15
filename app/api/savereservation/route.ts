import connection from "@/app/lib/db";
import { getReservationNumber } from "@/app/util/randomReservationNumber";
import { isEmail } from "@/app/util/validation";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";


export async function POST(request: Request) {

    const requestBody: any = await request.json();
    const { firstname, lastname, email, decideDate, details } = requestBody;


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
    } else if (!isEmail(email)) {
        return NextResponse.json({
            "status": false,
            "message": "Enter valid email"
        });

    } else if (decideDate == "") {
        return NextResponse.json({
            "status": false,
            "message": "Select Decide date"
        });
    }


    else if (details == "") {
        return NextResponse.json({
            "status": false,
            "message": "Enter details"
        });
    } else {

        const reservationNumber: string = getReservationNumber();
        const reservationDate: string = new Date()
            .toLocaleString("sv-SE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            })
            .replace(",", "");

        const booked: number = 1;



        try {

            await connection.query("INSERT INTO reservation (reservation_no,first_name,last_name,email,detail,reservation_date,status_id,decide_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)"
                , [reservationNumber, firstname, lastname, email, details, reservationDate, booked, decideDate]);


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


    try {

        const result: QueryResult = await connection.
            query("SELECT * FROM reservation INNER JOIN status ON status_id=id ORDER BY CASE type WHEN 'Booked' THEN 1 WHEN 'Confirm' THEN 2 WHEN 'Finished' THEN 3 WHEN 'Cancel' THEN 4 ELSE 5 END ASC");



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