import connection from "@/app/lib/db";
import { Room } from "@/app/util/room";
import { isNumber } from "@/app/util/validation";
import { NextResponse } from "next/server";
import { QueryResult } from "pg";

export async function POST(request: Request) {

    const requestBody: any = await request.json();

    const { no, statusID, status, updateStatus } = requestBody;


    if (no == "" || status == "" || status == "cancel" || status == "confirm" || !isNumber(statusID) || updateStatus == "") {

        return NextResponse.json({
            "status": false,
            "message": "Update faild check reservation details."
        });
    } else {

        try {
            await connection.query("SELECT *FROM reservation  WHERE reservation_no=$1 AND status_id=$2",
                [no, statusID]);



            if (updateStatus == "cancel") {

                const cancelID: number = 3;

                await connection.query("UPDATE reservation SET status_id=$1 WHERE reservation_no=$2", [cancelID, no]);

                return NextResponse.json({
                    "status": true,
                    "message": "Reservation canceled"
                });

            } else if (updateStatus == "confirm") {

                const confirmID: number = 4;
                 const bookID: number = 1;
                const availableRoom=await AllowsRoom();
                const availableRoomNo=availableRoom?.room_no;

                await connection.query("UPDATE reservation SET status_id=$1 ,room_no=$2 WHERE reservation_no=$3", [confirmID,availableRoomNo,no]);
                
                await connection.query("UPDATE room SET status_id=$1 WHERE room_no=$2",[bookID,availableRoomNo]);

                return NextResponse.json({
                    "status": true,
                    "message": "Reservation confirm successed.",
                    "roomNo":availableRoom?.room_no

                });


            }


        } catch (error) {

            return NextResponse.json({
                "status": false,
                "message": "Reservation Not found."
            });

        }




    }



}

async function AllowsRoom():Promise<Room|undefined> {


    const availbale: number = 2;

    try {
        const results:QueryResult = await connection.query("SELECT*FROM room WHERE status_id=$1 ORDER BY room_no ASC", [availbale]);
        const room:Room = results.rows[0];
        return room;

    } catch (error) {

        console.log(error);


    }




}