// App.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import "./styles.css";
import Item from "./Item";


// короче я весь мусор вроде поубирал должно быть все ок ниже напишу че зачем сделал

export default function App() {
    const [count, setCount] = useState(0); 
    const divRef = useRef(null)


    useEffect(() => {
        const effectFunc = () => {
            const element = divRef.current
            if(!element) return // проверка если ref все еще null то мы ничего не делаем чтобы приложение не крашилось неожиданно

            if (window.scrollY > 100) {
                element.style.position = "absolute";
                element.style.top = window.scrollY + "px";
            } else {
                element.style.position = "static";
            }// тут я логику переписал вроде как на первый взгляд все должно работать
        }
      

        window.addEventListener("scroll", effectFunc) // подписался

        return () => window.removeEventListener("scroll", effectFunc) // отписался
    }, [])

    const clickFunc = useCallback(() => {
        setCount(prev => prev + 1)
    },[]) // мемоизировал ссылку на функцию и обернул Item в memo чтобы не ререндерился Item

    return (
        <div className="App">
            <div className="block-wrapper">
                <div ref={divRef} className="top-section">
                    <button onClick={() => alert(count)}>
                        Show count
                    </button>
                    <button onClick={() => setCount(0)}>
                        Reset count
                    </button>
                </div>
                {[...Array(6)].map((_,i) => (
                    <Item key={i} onAdd={clickFunc} />
                ))} // еще можно было бы просто вставить key="item1" key="item2".... но я посчитал что лучше использовать индексы массива в качестве ключей так кода меньше и в целом концепция такая же
            </div>
        </div>
    );
}



// Item.tsx

import React, {memo} from "react";
import "./styles.css";

type Props = {
    onAdd: () => void;
};

function ItemComp (props: Props){
    return (
        <div className="block">
            <button className="btn" onClick={props.onAdd}>
                Add to cart
            </button>
        </div>
    );
}

export const Item = memo(ItemComp)


