//Esta é a app que criámos, para permitir definir que pathname mostrar ao browser, e assim mudar de widget

import React, {useEffect, useState} from "react";

const Route = ({path, children}) => {  //Esta é uma expressão que criámos, para definir que widget mostrar, dependo do pathname apresentado no browser (por exemplo, /dropdown, vai apresentar o dropdown)

    const [currentPath, setCurrentPath] = useState(window.location.pathname); //Esta função serve para fazer update ao Route

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener("popstate", onLocationChange);

        return () => {
            window.removeEventListener("popstate", onLocationChange);
        }

    }, []); //Aqui colocamos as [] como 2º argumento, para indicar que só queremos que este event handler corra uma unica vez

    return currentPath === path 
    ? children
    : null;
};

export default Route;