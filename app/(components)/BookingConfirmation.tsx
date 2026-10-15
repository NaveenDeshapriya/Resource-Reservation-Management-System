import { useEffect, useRef, useState } from "react";
import { Reservation } from "../util/user";
import { ToastBar } from "./ToastBar";


type props = {
    visible: boolean
    reservation: Reservation | undefined,
    onCancel: () => void,
    refresh: () => void

}

type statusProps = {
    status: boolean,
    message: string,
    roomNo?: number,
}

export function Confirmation(arg: props) {


    if (!arg.visible || arg.reservation?.status.toLowerCase() == "cancel" || arg.reservation?.status.toLowerCase() == "confirm" || arg.reservation?.status.toLowerCase() == "finished") return;

    const setCancelOrConfirm = useRef<string>("");
    const [reservationUpdateDetails, setReservationUpdateDetails] = useState<statusProps | undefined>(undefined);
    const [showToast, setShowToast] = useState<boolean>(false);

    const updateReservationStatus = async () => {
        const response = await fetch("/api/updatereservation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                no: arg.reservation?.no,
                statusID: arg.reservation?.statusID,
                status: arg.reservation?.status,
                updateStatus: setCancelOrConfirm.current,
            })
        });

        if (response.ok) {

            const json = await response.json();

            if (json.status) {

                setReservationUpdateDetails({ message: json.message, status: json.status, roomNo: json.roomNo });
                setShowToast(true);
                arg.refresh();

            } else {
                setReservationUpdateDetails({ message: json.message, status: json.status });
                setShowToast(true);
            }

        }
    }




    return (

        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
            <div className="w-[100vh] h-[45vh] absolute top-16 shadow bg-slate-100 flex flex-col justify-center items-center">

                <h1 className="text-xl m-5">Reservation Update </h1>

                <div>
                    <ul>
                        <li>Reservation Date:<span className="ms-2 font-semibold">{arg.reservation?.date}</span></li>
                        <li>Reservation No:<span className="ms-2 font-semibold">{arg.reservation?.no}</span></li>
                        <li>Email:<span className="ms-2 font-semibold">{arg.reservation?.email}</span></li>
                        <li className={reservationUpdateDetails?.status ? "mt-2" : "hidden"}>
                            <span className="font-bold text-2xl">
                                Room No: {reservationUpdateDetails?.roomNo}
                            </span>
                        </li>

                    </ul>
                </div>

                <div className=" w-full h-1/3 flex justify-between items-end pe-2 ps-2">

                    <button className="w-1/3 h-9 rounded-sm  cursor-pointer  active:translate-x-0.5 active:scale-95  shadow " onClick={() => {
                        setCancelOrConfirm.current = ("cancel");
                        updateReservationStatus();


                    }}>Cancel Booking</button>
                    <button className="w-1/3 h-9 rounded-sm  bg-black text-slate-50 cursor-pointer active:translate-x-0.5 active:scale-95 shadow" onClick={() => {
                        setCancelOrConfirm.current = ("confirm");
                        updateReservationStatus();

                    }}>Confirm Booking</button>

                </div>


            </div>

            {
                showToast ? <ToastBar closeToast={() => setShowToast(false)} color={reservationUpdateDetails?.status ? "#9afc95" : "#ffa099"} message={reservationUpdateDetails?.message} visible={showToast} /> : <></>

            }


            <button className="w-10 h-10 absolute bottom-5 rounded-full bg-white/15 text-white active:translate-0.5 cursor-pointer" onClick={arg.onCancel}>X</button>

            

        </div>


    );

}


