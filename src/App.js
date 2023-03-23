import './App.css';
import {useEffect, useState} from "react";

function App() {

    let [data, setData] = useState([])
    let [search,setSearch]=useState([''])

    useEffect(() => {
        fetch('https://emoji-api.com/emojis?access_key=dd44ee51db8369b1fa5a78742276b4f8fc6468e8')
            .then(res => res.json())
            .then(res => setData(res))
    }, [])

    let handleSearch = (e) =>{
        setSearch(e.target.value)
    }

    let handleSubmit = () =>{
        console.log("Button is pressed");
        if (search !== ''){
            fetch('https://emoji-api.com/emojis?search=' + search +'&access_key=dd44ee51db8369b1fa5a78742276b4f8fc6468e8')
                .then(res => res.json())
                .then(res => setData(res))}
    }

    return (
        <div className="App">
            <h1>
                Emoji Search
            </h1>
            <p className="pStyle">
                Enter the key word
            </p>
            <input type="text" placeholder="e.g. smile" className="inputStyle" value={search} onChange={(e)=>handleSearch(e) }/>
            <button className='search' onClick={handleSubmit}> 🔎</button>
            <div className="container">{
                data.map((e,i) =>
                    <div className="cell" key ={e.slug}>
                        <p className="emojiStyle">{e.character}</p>
                        <p className="descriptionStyle">{e.unicodeName}</p>
                    </div>
                )
            }


            </div>
        </div>
    );
}

export default App;
