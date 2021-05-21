import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './styles.module.css';

export const Meme = () => {
    const[memes,setMemes] = useState([]);
    const[memeIndex, setMemeIndex] =useState(0);
    const[captions, setCaptions] = useState([]);

    const history = useHistory();

    const updateCaptions = (e,index) =>{
        const text = e.target.value;
        setCaptions(
            captions.map((c,i) => {
                if (index===i) {
                    return text;
                } else {
                    return c;
                }
            })
        );
    }

        const generateMemes=() => {
        const currentMeme = memes[memeIndex];
        const formdata = new FormData();
        formdata.append('username','MayankGirigoswami');
        formdata.append('password','7869498557');
        formdata.append('template_id', currentMeme.id);
        captions.forEach((c,index) => formdata.append(`boxes[${index}][text]`,c));

        fetch('https://api.imgflip.com/caption_image',{
            method: 'POST',
            body: formdata
        }).then(res=>{
            res.json().then(res=>{
                history.push(`/generated?url=${res.data.url}`);
            })
        })
    }

    const shuffleMemes = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      };

    useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes').then(res =>{
            res.json().then(res =>{
                //console.log(res);
                const memes = res.data.memes;
                shuffleMemes(memes);
                setMemes(memes);
            })
        })
    } , []);

    useEffect(() => {
        if(memes.length){
            setCaptions(Array(memes[memeIndex].box_count).fill(''));
        }
    } , [memeIndex,memes]);
    return (
        
            memes.length ? 
            <div className={styles.container}>
            <button onClick={generateMemes} className={styles.generate}>Generate</button>
            <button onClick={()=> setMemeIndex(memeIndex+1)} className={styles.skip}>Skip</button>
            {
                captions.map((c,index) =>(
                    <input onChange={(e)=> updateCaptions(e,index)} key={index}/>
                ))
            }
                <img src={memes[memeIndex].url}  alt="img"/>
            </div> : 
            <></>
    );
}
