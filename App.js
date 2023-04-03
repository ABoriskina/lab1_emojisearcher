import './App.css';
import {useState, useEffect} from "react";

function App() {

    let [data, setData] = useState([])
    let [search,setSearch]=useState([''])

    let refresh = () => {
        fetch('https://emoji-api.com/emojis?access_key=dd44ee51db8369b1fa5a78742276b4f8fc6468e8')
            .then(res => res.json())
            .then(res => setData(res))
    }

    let refresh_gif = () => {
        fetch('https://api.giphy.com/v1/gifs/trending?api_key=wV0B0CGNA9BdPYUZlH0gOb5F2PcQNsJ6&limit=25&rating=g')
            .then(res => res.json())
            .then(res => setData(res.data))
    }


    useEffect(() => {refresh_gif()}, [])

    let handleSearch = (e) =>{
        setSearch(e.target.value)
    }

    let copyToClipBoard = (emoji) =>{

        navigator.clipboard.writeText(emoji)
            .then(() => {
                document.querySelector('.out').innerHTML += 'copy'
            })
            .catch(err => {
                console.error('Some errors occurred: ', err);
            });

        document.getElementById("searchField").value += emoji;

    }

    let handleSubmit = () =>{
        if (search !== ''){
            fetch('https://emoji-api.com/emojis?search=' + search +'&access_key=dd44ee51db8369b1fa5a78742276b4f8fc6468e8')
                .then(res => res.json())
                .then(res => setData(res))
        }
        else {
            refresh();
        }
    }

    let handleSubmit_gif = () => {
        if (search !== ''){
            fetch('https://api.giphy.com/v1/gifs/search?api_key=wV0B0CGNA9BdPYUZlH0gOb5F2PcQNsJ6&q=' + search + '&limit=25&offset=0&rating=g&lang=en')
                .then(res => res.json())
                .then(res => setData(res.data))
        }
        else {
            refresh_gif();
        }
    }

    return (
        <div className="App">
            <h1>
                Emoji Search
            </h1>
            <p className="pStyle">
                Enter the key word
            </p>
            <input id = "searchField" type="text" className="inputStyle" value={search} onChange={(e)=>handleSearch(e) }/>
            <button className='search' onClick={handleSubmit_gif}> 🔎</button>
            <div className="container">{
                data.map((e, i) =>
                    <div className="cell" key ={e.id}>
                        <img src={e.images.downsized_medium.url} id="emoji"/>
                        <p className="descriptionStyle">{e.title}</p>
                    </div>
                )
            }
            </div>
        </div>
    );
}

export default App;
