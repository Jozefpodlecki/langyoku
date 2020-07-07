import React, { useState, useEffect, useRef } from "react"
import { getDialogs } from "api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import style from './style.scss'

const useSpeechSynthesis = (options: any) => {
    const [voices, setVoices] = useState([]);
    const [voice, _setVoice] = useState(null);

    const getVoices = () => new Promise<SpeechSynthesisVoice[]>((resolve, reject) => {
        const speechSynthesis = window.speechSynthesis;
        const onVoicesChanged = (event) => {
            const voices = speechSynthesis.getVoices();
            speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
            resolve(voices);
        }

        speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
    })

    useEffect(() => {
        getVoices().then(voices => {
            setVoices(voices);
            _setVoice(voices.find(voice => voice.default));
        })
    }, [])

    const createSpeechSynthesisUtterance = (message) => {
        const speechSynthesisUtterance = new SpeechSynthesisUtterance(message);
        speechSynthesisUtterance.voice = voice;

        return speechSynthesisUtterance;
    }

    const setVoice = (language: string) => {
        voices.find(voice => voice.lang === language);
    }
    
    return [createSpeechSynthesisUtterance, setVoice] as [(message: string) => SpeechSynthesisUtterance, () => void]
}

const Dialogs = () => {
    const [dialogs, setDialogs] = useState([]);
    const [createSpeechSynthesisUtterance, setVoice] = useSpeechSynthesis({
        language: 'zh-CN'
    });
    const [isRecording, setIsRecording] = useState(false);
    const [canDraw, setDraw] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>(null);

    useEffect(() => {
        getDialogs({
            languageId: 1
        })
            .then(games => {
                setDialogs(games);
            })
    }, [])

    useEffect(() => {
        const element = canvasRef && canvasRef.current;
        if(element) {
            const canvasContext = element.getContext('2d');
            setCanvasContext(canvasContext);

            canvasContext.fillStyle = "white";
            canvasContext.fillRect(0, 0, element.width, element.height);
        }

    }, [canvasRef])

    const speak = (message: string) => {
        const speechSynthesisUtterance = createSpeechSynthesisUtterance(message)
        speechSynthesis.speak(speechSynthesisUtterance);

        speechSynthesisUtterance.addEventListener("start", (event) => console.log("start"))
        speechSynthesisUtterance.addEventListener("end", (event) => console.log("end"))
    }

    const record = () => {
        // ja-JP
        //'Je ne joue plus au tennis.'
        const recognition = new window['webkitSpeechRecognition']() as SpeechRecognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "zh-CN";

        recognition.onstart = function() {
            setIsRecording(true);
        };
        
        recognition.onresult = function(event) {
            console.log('result');
            let interim_transcript = '';
            let final_transcript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const result = event.results[i];
                
                if (result.isFinal) {
                    final_transcript += result[0].transcript;
                } else {
                    interim_transcript += result[0].transcript;
                }
            }

            console.log("Interim: ", interim_transcript);

            console.log("Final: ",final_transcript);

            console.log("Simple: ", event.results[0][0].transcript);
        }

        recognition.start();

        return recognition;
    }

    const recordAudio = () => {
        const recognition = record();

        setTimeout(() => {
            recognition.stop();
            console.log('stop');
            setIsRecording(false);
        }, 4000);
    }

    const playAudio = () => {
        speak('鼠标左右');
    }

    const startDrawing = (event: React.MouseEvent) => {
        setDraw(true);
    }

    const draw = (event: React.MouseEvent) => {
        if(canDraw) {
            const canvas = event.target as HTMLCanvasElement;
            const x = event.pageX - canvas.offsetLeft;
            const y = event.pageY - canvas.offsetTop;
            canvasContext.fillStyle = "black";
            canvasContext.fillRect(x, y, 5, 5);
        }
        
    }

    const clear = () => {
        canvasContext.fillStyle = "white";
        //canvasContext.fillRect(0, 0, element.width, element.height);
    }

    const stopDrawing = (event: React.MouseEvent) => {
        setDraw(false);
    }

    return <div>
        <div>
            <canvas ref={canvasRef} onMouseMove={draw} onMouseDown={startDrawing} onMouseUp={stopDrawing} width="250" height="250">

            </canvas>
        </div>
        <div className={style.actions}>
            <div onClick={recordAudio} className={style.recordButton}>
                <FontAwesomeIcon icon={faMicrophone}/>
                <div className={style.text}>{isRecording ? 'Stop recording' : 'Record'}</div>
            </div>
            <div onClick={playAudio} className={style.playButton}>
                <FontAwesomeIcon icon={faVolumeUp}/>
            </div>
        </div>
        
        {/* {stories.map(pr => <div>

        </div>)} */}
    </div>
}



export default Dialogs