import React, {useState} from "react"; //Isto é para podermos utilizar o hook "useState"

const Accordion = ({items}) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) => {
        setActiveIndex(index);
};

   const renderedItems = items.map( (item, index) => {
     const active = index === activeIndex ? "active" : ""; //Criamos a const active, que diz que: "se o index, for igual ao activeindex, então a resposta é active, caso contrário, a resposta é uma empty string"

     return (
         <React.Fragment key={item.title}> 
             <div 
             className={`title ${active}`}
             onClick={() => onTitleClick(index)}
             >
                 <i className="dropdown icon"></i>
                 {item.title}
             </div>
             <div className={`content ${active}`}>
                <p>{item.content}</p>
             </div>
         </React.Fragment>
     )
   });

return <div className="ui styled accordion">
    {renderedItems}
</div>
};

export default Accordion;