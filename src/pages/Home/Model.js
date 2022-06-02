import React , { useRef } from 'react'
import * as ReactDOM from 'react-dom';

export default function Model(props) {
    const { open , onClickOutside } = props;

    const ref = useRef();

    React.useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside && onClickOutside();
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      }, [ onClickOutside ]);
  
      if(!open) return null;

  return (
   <> 
    <div ref={ref}> {props.children}</div>
    </>
  )
}
