import axios from "axios";
import { useEffect } from "react";

function App() {

    useEffect(() => {
        axios.get("http://localhost:5000/api/test")
            .then(res => console.log(res.data))
            .catch(console.error);
    }, []);

    return <h1>Webshop</h1>;
}

export default App;