import { useEffect, useRef, useState } from "react";

export default function useDebounce(value: any, delay: number, callback?: any) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      callback?.()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [callback, delay, value])


  return debouncedValue
}
// export function useDebounce<A extends any[]>(
//   callback: (...args: A) => void,
//   wait: number
// ) {
//   const argsRef = useRef<A>();
//   const timeout = useRef<ReturnType<typeof setTimeout>>();

//   const clearUp = () => {
//     if (timeout.current) clearTimeout(timeout.current);
//   };
//   useEffect(() => clearUp, []);

//   return function debouncedCallback(...args: A) {
//     argsRef.current = args;
//     clearUp();
//     timeout.current = setTimeout(() => {
//       if (argsRef.current) {
//         callback(...argsRef.current);
//       }
//     }, wait);
//   };
// }

// export const useDebounce = (value: string, delay: number) => {

//   const [debouncedValue, setDebouncedValue] = useState(value)

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value)
//     }, delay)

//     return () => {
//       clearTimeout(handler)
//     }
//   }, [value, delay])
    

// }

// export const useDebounce = (value: string, delay: number) => {

// }

