// App.tsx
import { useState, useRef, useEffect, useCallback } from "react";
import "./styles.css";
import Item from "./Item";




export default function App() {
    const [count, setCount] = useState(0); 
    const divRef = useRef(null)


    useEffect(() => {
        const effectFunc = () => {
            const element = divRef.current
            if(!element) return 

            if (window.scrollY > 100) {
                element.style.position = "absolute";
                element.style.top = window.scrollY + "px";
            } else {
                element.style.position = "static";
            }
        }
      

        window.addEventListener("scroll", effectFunc) 

        return () => window.removeEventListener("scroll", effectFunc) 
    }, [])

    const clickFunc = useCallback(() => {
        setCount(prev => prev + 1)
    },[]) 

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
                ))} 
            </div>
        </div>
    );
}



// Item.tsx

import {memo} from "react";
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


