import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

type ApiResponse= {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}
function App() {

    const [data, setData] = useState<ApiResponse>({userId:0, id:0, title:"init", completed:true})
    const [id, setId] = useState<number>(1)

    //aufbau useEffect:
    //useEffect(Methode die ausgeführt werden soll, in meinem Bsp. () => fetchdata
    // also: eine Methode OHNE Übergabeparameter, welche fetchdata aufrufen soll.
    //gefolgt von einem [] => dem sog. dependency Array. Hier wird festgehalten, wann der useEffect ausgelöst weren soll.
    //Ist er leer ([]) => wird der useEffekt nur ausgelöst, beim ersten Rendern der Komponente
    //ist der gefüllt z. B. [id] => löst er beim ersten Rendern der Komponente aus UND wenn sich die in Abhängigkeit stehenden Felder ändern z. B. id wird ein neuer Wert über setId zugeordnet
    useEffect(
        () => fetchData
        , [id]
    )
    function fetchData(){
        //axios ermöglicht alle gängigen http-requests (get, post, put, delete)
        axios.get("https://jsonplaceholder.typicode.com/todos/"+id)
            //Axios erhält eine Response, welche wir gezielt auslesen können
            //relevante Daten befinden sich für uns unter data, weshalb wir diesen Inhalt in unserem Setter wollen
            .then((response) => setData(response.data))
            //Sollte ein Fehler, z. B. Exception im Backend stattfinden, wird diese abgefangen und ausgegeben
            //verhindert also einen crash unserer Komponente
            .catch((error) => console.log(error.message))
    }

  return (
    <>
        <button onClick={() => setId(id+1)}>Click me!</button>
        <h3>Response</h3>
        <p>{data.title}</p>
        <p>{data.completed}</p>

    </>
  )
}

export default App
