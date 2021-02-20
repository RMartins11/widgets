//Criámos esta app para: 1- podermos reutilizar o Link; 2 - Podermos criamos um Event Handler que impeça a página de fazer reload totalmente quando mudamos de widget (era o problema que tinhamos antes, que cria demasiado tráfego na página)

import React from "react";

const Link = ({className, href, children}) => {

    const onClick = (event) => { //Este é o evento que criámos, para prevenir a página de fazer reload total, quando mudamos de separador
        
        if(event.metakey || event.ctrlKey) { //Este if statement, permite que caso cliquemos no browser em "open in new tab", ele abra um novo separador, com a opção que escolhemos
            return;
        }

        event.preventDefault();
        window.history.pushState({}, "", href); //Esta função serve para sincronizar o url, consoante o separador da App em que estamos

        const navEvent = new PopStateEvent("popstate"); //Estes 2 eventos abaixo, vão transmitir a informação à nossa app, de que o URL mudou, e assim, mudar também o conteúdo que mostra no ecrã
        window.dispatchEvent(navEvent);
    };

    return <a 
    onClick={onClick} 
    className={className} 
    href={href} 
    children={children}>
        {children}
        </a>

};

export default Link;