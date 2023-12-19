import { useCallback, useRef, useState } from "react";

const CHARS = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm1234567890!@#$%^&*.,`<>/?+-=_~"; //()[]{}:;|,

const EncryptText = ({target_text, className} : {target_text: string, className? : string}) => {
    
    const intervalRef = useRef<any>(null);
    const intervalRef2 = useRef<any>(null);
    const [text, setText] = useState(target_text);

    const CYCLES_PER_LETTER = 1;

    const stopScrambleReverse = useCallback(() => { 
        clearInterval(intervalRef2.current);
        setText(target_text)
    },[target_text]);

    const stopScramble = useCallback(() => {        
        clearInterval(intervalRef.current);
        setText(target_text)
    },[target_text]);


    const scramble = useCallback(() => {
        let pos = 0;
        let SHUFFLE_TIME = 69;

        intervalRef.current = setInterval(() => {
                        
            const scrambled = target_text.split("")
                .map((char, index, arr) => {
                if (pos / CYCLES_PER_LETTER > index) {
                    return char;
                }
            const randomCharIndex = Math.floor(Math.random() * CHARS.length);
            const randomChar = CHARS[randomCharIndex];
            return randomChar;
            })
            .join("");

            setText(scrambled);
            pos++;
            SHUFFLE_TIME--;
            if (pos >= target_text.length * CYCLES_PER_LETTER) {
                stopScramble();
            }

        }, SHUFFLE_TIME);
    },[stopScramble, target_text]);

    const scrambleReverse = useCallback(() => {
        let pos = 0;
        let SHUFFLE_TIME = 69;
        
        intervalRef2.current = setInterval(() => {
                        
            const reverseText = target_text.split('').reverse();

            const scrambled = reverseText
                .map((char, index, arr) => {
                if (pos / CYCLES_PER_LETTER > index) {
                    return char;
                }
            const randomCharIndex = Math.floor(Math.random() * CHARS.length);
            const randomChar = CHARS[randomCharIndex];
            return randomChar;
            })
            .reverse().join("");

            setText(scrambled);
            pos++;
            SHUFFLE_TIME--;

            if (pos >= target_text.length * CYCLES_PER_LETTER) {
                stopScrambleReverse();
            }

        }, SHUFFLE_TIME);
    },[stopScrambleReverse,target_text]);


  return (
    <span
      onMouseEnter={() => {stopScrambleReverse(); scramble()}}
      onMouseLeave={() => {stopScramble(); scrambleReverse()}}
      className={`relative flex items-center justify-center w-full h-full z-3 select-none ${className}`}
    >
        {text}
    </span>
  );
};

export default EncryptText;