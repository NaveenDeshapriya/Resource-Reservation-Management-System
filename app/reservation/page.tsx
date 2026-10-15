'use client'
import { useState } from "react";
import Navbar from "../(components)/Navbar";
import { ToastBar } from "../(components)/ToastBar";
import { Toast } from "../util/toast";

export default function Reservation() {

    const [firstname, setFirstName] = useState<string>("");
    const [lastname, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [decideDate, setDecideDate] = useState<string>("");
    const [details, setDetails] = useState<string>("");
    const [reservationNo, setReservationNo] = useState<string>("-");
    const [toastDetails, setToastDtails] = useState<Toast | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false);



    const saveReservation = async () => {
        const response = await fetch("/api/savereservation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                decideDate:decideDate,
                details: details
            })
        });

        if (response.ok) {

            const json = await response.json();

            if (json.status) {
                setReservationNo(json.reservationNo);
                setToastDtails({
                    status: json.status,
                    message: json.message
                });

                setShowToast(true);


            } else {

                setToastDtails({
                    status: json.status,
                    message: json.message
                });

                setShowToast(true);
            }

        }
    }



    return (

        <>

            <Navbar />

            <div className="h-[90vh] flex justify-center items-center">

                <div className="w-1/3 shadow  border-gray-200 rounded-sm p-3">

                    <div className="flex justify-between items-center">
                        <label>Reservation ID</label>
                        <input className="font-semibold" value={reservationNo} disabled />

                    </div>

                    <div className="flex justify-between items-center">
                        <label>First Name</label>
                        <input className=" outline-0 h-10 w-54 border-b border-gray-400" onChange={(e) => setFirstName(e.target.value)} />
                    </div>

                    <div className="flex justify-between items-center">
                        <label>Last Name</label>
                        <input className=" outline-0 h-10 w-54 border-b border-gray-400" onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    <div className="flex justify-between items-center">
                        <label>Email</label>
                        <input className=" outline-0 h-10 w-54 border-b border-gray-400" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="flex justify-between items-center">
                        <label>Decide of date</label>
                        <input type="date"  className=" outline-0 h-10 w-54 border-b border-gray-400" onChange={(e) => setDecideDate(e.target.value)} />
                    </div>

                    <div className="flex justify-between items-center">
                        <label>Details</label>
                        <textarea className=" outline-0 h-10 w-54 border-b border-gray-400 " onChange={(e) => setDetails(e.target.value)} />
                    </div>


                    <div>


                        <button className="text-md w-full h-11 bg-blue-950 text-white 
                                           rounded-sm hover:bg-blue-900 cursor-pointer mt-5 active:translate-x-0.5 active:scale-95"

                            onClick={saveReservation}>Confirm Reservation</button>
                    </div>


                </div>


                {
                    showToast ? <ToastBar closeToast={() => setShowToast(false)} color={toastDetails?.status ? "#9afc95" : "#ffa099"} message={toastDetails?.message} visible={true} /> : <></>
                }




            </div>




        </>

    );
}