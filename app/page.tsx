'use client'
import { useRouter } from "next/navigation";
import Navbar from "./(components)/Navbar";
import { useEffect, useState } from "react";
import { Toast } from "./util/toast";
import { ToastBar } from "./(components)/ToastBar";

export default function Home() {

  const router = useRouter();
  const [toastDetails, setToastDtails] = useState<Toast | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);

  const [currentDate, setCurrentDate] = useState("");

 

  const checkReservationAvailable = async () => {
    const response = await fetch("/api/booking");

    if (response.ok) {

      const json = await response.json();

      if (json.status) {

        router.push("/reservation");

      } else {

        setToastDtails({
          status: json.status,
          message: json.message
        });

        setShowToast(true);

      }


    }

  }

   useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString("en-GB"));
  }, []);

  return (

    <>

      <Navbar />


      <div className="flex justify-center items-center h-[90vh] gap-10">



        <div className="flex-col flex justify-center  items-center w-sm h-[220] rounded-b-lg bg-indigo-950 shadow  ">

          <ul className="text-white space-y-1">
            <li>Location : Sri Lanka-Galle</li>
            <li>Date : {currentDate}</li>
            <li>Raiting : <span className="text-yellow-400 text-2xl">******</span></li>
          </ul>

          <button className="bg-amber-50 w-44 h-8 flex justify-center items-center rounded-2xl
         hover:bg-blue-900 hover:text-white cursor-pointer mt-5 active:translate-x-0.5 active:scale-95" onClick={checkReservationAvailable}>Book</button>


        </div>

        {
          showToast ? <ToastBar closeToast={() => setShowToast(false)} color={toastDetails?.status ? "#9afc95" : "#ffa099"} message={toastDetails?.message} visible={true} /> : <div></div>
        }



      </div>

    </>








  );
}
