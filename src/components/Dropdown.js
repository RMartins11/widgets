import React, { useEffect, useState, useRef } from "react";

const Dropdown = ({label, options, selected, onSelectedChange}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect (() => {
        document.body.addEventListener("click", (event) => { //MUITO IMPORTANTE: Esta é a solução, para se poder fechar o dropdown, clicando em qualquer ponto da página
            if(ref.current && ref.current.contains(event.target)) { //Isto é para dar prioridade aos "On Click" events que foram criados nas div's abaixo. Foi colocada uma ref na div do ui form, para a identificar
                return;
            }
            setOpen(false)
        });

    }, []);

    const renderedOptions = options.map((option) => {

        if(option.value === selected.value) {
            return null; //Isto serve para que a opção escolhida na dropdown (neste caso a cor), saia da lista, ficando apenas as outras opções que se podem escolher
        }
        return (
            <div
            key={option.value}
            onClick={() => onSelectedChange(option)}
            className="item">
                {option.label}
            </div>
        );
    });

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div
                    onClick= {() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? "visible active" : ""}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? "visible transition" : ""}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dropdown;
