'use client'
import { useEffect, useState } from "react";
import { Reservation } from "../util/user";
import { Confirmation } from "../(components)/BookingConfirmation";
import { Toast } from "../util/toast";
import { ToastBar } from "../(components)/ToastBar";
export default function Dashboard() {

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [search, setSearch] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [reservation, setReservation] = useState<Reservation | undefined>(undefined);
    const [toastDetails, setToastDtails] = useState<Toast | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false);


    const getAllReservation = async () => {

        const response = await fetch("/api/savereservation");

        if (response.ok) {
            const json = await response.json();

            if (json.status) {
                const reservationList: Reservation[] = json.reservationList.map((values: any): Reservation => (
                    {

                        no: values.reservation_no,
                        date: values.reservation_date,
                        name: values.first_name + " " + values.last_name,
                        email: values.email,
                        detail: values.detail,
                        statusID: values.id,
                        status: values.type,
                        decideDate: values.decide_date


                    }
                ));

                setReservations(reservationList);

            }


        }

    }

    const getActionRecervation = async (reservationNo: string) => {
        console.log(reservationNo);

        const response = await fetch("/api/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                reservationNo: reservationNo
            })
        });

        if (response.ok) {
            const json = await response.json();
            if (json.status) {

                setToastDtails({
                    status: json.status,
                    message: json.message
                });

                setShowToast(true);
                getAllReservation();


            }
        }
    }


    useEffect(() => {

        getAllReservation();


    }, []);

    const filterReservations: Reservation[] = reservations.filter((value: Reservation) => {
        return value.no.toLowerCase().includes(search.toLowerCase()) || value.status.toLowerCase().includes(search.toLowerCase());
    })



    return (
        <div>
            <h1 className="text-2xl p-2">Dashboard</h1>


            <div className="w-full h-[90vh] ">

                <div className="flex justify-between items-center mb-[4]">
                    <h3 className="ms-2">Latest Reservation</h3>

                    <input className="w-[450] h-10 border-b border-gray-400 outline-0"
                        placeholder="Search reservation..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <Confirmation visible={show} reservation={reservation} onCancel={() => setShow(false)} refresh={getAllReservation} />

                <table className="table w-full table-fixed">
                    <thead className="bg-gray-200 h-10 ">

                        <tr >
                            <th scope="col" className=" font-thin border border-gray-400">Reservation No</th>
                            <th scope="col" className=" font-thin border border-gray-400">Booked Date</th>
                            <th scope="col" className=" font-thin border border-gray-400">User</th>
                            <th scope="col" className=" font-thin border border-gray-400">Details</th>
                            <th scope="col" className=" font-thin border border-gray-400">Reservationed Date</th>
                            <th scope="col" className=" font-thin border border-gray-400">Status</th>

                        </tr>

                    </thead>

                    <tbody className="border-b border-gray-300 text-center text-sm">


                        {


                            reservations.length <= 0 ? <tr className="h-10"><td colSpan={5}>Reservation not recent...</td></tr> :

                                filterReservations?.map((values: Reservation) => (
                                    <tr key={values.no} className=" hover:bg-gray-700 hover:text-white h-8 font-bold ">
                                        <td>{values.no}</td>
                                        <td>{values.date}</td>
                                        <td>{values.name}</td>
                                        <td>{values.detail}</td>
                                        <td>{values.decideDate}</td>
                                        <td>
                                            <button className={`${values.status == "Booked" ? "bg-green-500" :
                                                values.status == "Cancel" ? "bg-red-500" :
                                                    values.status == "Confirm" ? "bg-sky-500" : values.status == "Finished" ? "bg-olive-500" : ""} w-auto me-1 pl-2 pr-2 h-6 rounded-2xl cursor-pointer active:translate-x-0.5 active:scale-95`} onClick={() => {
                                                        setTimeout(() => {
                                                            setReservation(values);
                                                            setShow(true);

                                                        }, 300)
                                                    }}>{values.status}</button>

                                            {
                                                values.status == "Confirm" ?
                                                    <button className="bg-gray-400 p-0.5 rounded-sm cursor-pointer active:translate-x-0.5 active:scale-95" onClick={() => getActionRecervation(values.no)}>Finish Reservation</button> : ""
                                            }

                                        </td>


                                    </tr>
                                ))
                        }



                    </tbody>
                </table>
                <div className="flex justify-center items-center">
                    {
                        showToast ? <ToastBar closeToast={() => setShowToast(false)} color={toastDetails?.status ? "#9afc95" : ""} message={toastDetails?.message} visible={true} /> : <></>
                    }
                </div>
            </div>
        </div>
    );
}