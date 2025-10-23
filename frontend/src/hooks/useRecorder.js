import {useState,useRef} from "react";
export default function useRecorder(){
  const [recording,setRecording]=useState(false);
  const [audioURL,setAudioURL]=useState(null);
  const mediaRecorder=useRef(null);
  const chunks=useRef([]);
  const startRecording=async()=>{
    try{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      mediaRecorder.current=new MediaRecorder(stream);
      chunks.current=[];
      mediaRecorder.current.ondataavailable=e=>{if(e.data&&e.data.size>0) chunks.current.push(e.data);};
      mediaRecorder.current.onstop=()=>{
        const blob=new Blob(chunks.current,{type:"audio/webm"});
        setAudioURL(URL.createObjectURL(blob));
        stream.getTracks().forEach(t=>t.stop());
      };
      mediaRecorder.current.start();
      setRecording(true);
    }catch(e){console.error("Could not start recording",e);}
  };
  const stopRecording=()=>{if(mediaRecorder.current&&mediaRecorder.current.state!=="inactive") mediaRecorder.current.stop();setRecording(false);}
  return {recording,startRecording,stopRecording,audioURL};
}