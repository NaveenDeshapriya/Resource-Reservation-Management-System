
type props={
    className:string,

}

export default function Input(arg:props){
    return(
         <input className={arg.className} placeholder="Find reservation..." onChange={(e)=>{
            
            const searchText=e.target.value;

         }}/>
    )
}