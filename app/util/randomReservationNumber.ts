
export  function getReservationNumber():string {


    const number:number= Math.random();

    return ("RN-".concat(String(number).substring(6,12)));

}


