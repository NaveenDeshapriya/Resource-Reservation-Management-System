'use client'
import { useEffect, useState } from "react";
import Input from "../(components)/SearchBar";
import Button from "../(components)/StatusButton";
import { Reservation } from "../util/user";
export default function Dashboard() {

    const [reservations, setReservations] = useState<Reservation[]>([]);

    const getAllReservation = async () => {

        const response = await fetch("/api/savereservation");

        if (response.ok) {
            const json = await response.json();

            if (json.status) {
                json.reservationList.forEach((values: any) => {
                    setReservations(prev=>[...prev,{
                        no: values.reservation_no,
                        date: values.reservation_date,
                        name: values.first_name + " " + values.last_name,
                        email: values.email,
                        detail: values.detail,
                        statusID: values.id,
                        status: values.type
                    }]);

                })

            }


        }

    }

    useEffect(() => {

        getAllReservation();

    }, []);




    return (
        <div>
            <h1 className="text-2xl p-2">Dashboard</h1>


            <div>

                <div className="flex justify-between items-center mb-[4]">
                    <h3 className="ms-2">Latest Reservation</h3>
                    <Input className="w-1/3 h-10 border-b border-gray-400 outline-0" />

                </div>

                <table className="table w-full">
                    <thead className="bg-gray-200 h-10 ">

                        <tr >
                            <th scope="col" className=" font-thin border border-gray-400">Reservation No</th>
                            <th scope="col" className=" font-thin border border-gray-400">Date</th>
                            <th scope="col" className=" font-thin border border-gray-400">User</th>
                            <th scope="col" className=" font-thin border border-gray-400">Details</th>
                            <th scope="col" className=" font-thin border border-gray-400">Status</th>

                        </tr>

                    </thead>

                    <tbody className="border-b border-gray-300 text-center text-sm">
                        {
                            reservations?.map((values: Reservation) => (
                                <tr key={values.no} className=" hover:bg-gray-700 hover:text-white h-8 font-bold ">
                                    <td>{values.no}</td>
                                    <td>{values.date}</td>
                                    <td>{values.name}</td>
                                    <td>{values.detail}</td>
                                    <td><Button className={`${values.status == "Booked" ? "bg-green-500" :
                                        values.status == "Cancel" ? "bg-red-500" :
                                            values.status == "Confirm" ? "bg-sky-500" :
                                                values.status == "Available" ? "bg-amber-500" : ""} w-auto pl-2 pr-2 h-6 rounded-2xl cursor-pointer`} status={values.status} rn_id={values.no} /></td>
                                </tr>
                            ))
                        }



                    </tbody>
                </table>

            </div>
        </div>
    )
}