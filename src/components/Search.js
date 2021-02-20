import React, {useEffect, useState} from "react";
import axios from "axios";

const Search = () => {

    const [term, setTerm] = useState("");
    const [results, setResults] = useState([]);


    useEffect(() => {
        const search = async () => {
           const {data} = await axios.get("https://en.wikipedia.org/w/api.php", {
                params:{
                    action: "query",
                    list: "search",
                    origin: "*",
                    format: "json",
                    srsearch: term,
                },
            });

            setResults(data.query.search);
        };

        const timeoutid = setTimeout(() => { //Este timeout vai fazer com que a nossa pesquisa se inicie apenas 500ms depois de acabar de escrever, para reduzir o numero de pedidos à API
            if(term){
                search();
                }
        }, 500);

        return () => {
            clearTimeout(timeoutid); //Isto serve para reiniciar o contador, cada vez que se adiciona uma nova letra na pesquisa
        };

    }, [term]);

    const renderedResults = results.map((result) => {
        return (
        <div key={result.pageid} className="item">
            <div className="right floated content">
                <a 
                className="ui button"
                href={`https://en.wikipedia.org?curid=${result.pageid}`}
                target="_blank"
                >Go</a>
            </div>
         <div className="content">
            <div className="header">
                {result.title}
            </div>
            <span dangerouslySetInnerHTML={{__html: result.snippet}}></span> 
                
         </div>
        </div>
        
        );
    });

 return (
     <div>
         <div className="ui form">
             <div className="field">
                 <label>Enter Search Term</label>
                 <input 
                 className="input"
                 value={term}
                 onChange={e => setTerm(e.target.value)}
                 />
             </div>
         </div>
         <div className="ui celled list">{renderedResults}</div>
     </div>
 );
};

export default Search;