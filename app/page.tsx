import BookLink from "./(components)/BookLink";
import Navbar from "./(components)/Navbar";


export default function Home() {
  const bookAppointment = () => {

  }

  return (

    <>

      <Navbar />


      <div className="flex justify-center items-center h-[90vh] gap-10">



        <div className="flex-col flex justify-center  items-center w-sm h-[220] rounded-b-lg bg-indigo-950 shadow  ">

          <ul className="text-white space-y-1">
            <li>Location : Sri Lanka-Galle</li>
            <li>Date : 10/13/2026</li>
            <li>Status : Available</li>
          </ul>

          <BookLink className="bg-amber-50 w-44 h-8 flex justify-center items-center rounded-2xl
         hover:bg-blue-900 hover:text-white cursor-pointer mt-5"

            status="Book"

          />


        </div>



      </div>

    </>








  );
}
