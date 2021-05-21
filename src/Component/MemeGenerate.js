import React from 'react';
import { useState } from "react";
import styles from './styles.module.css';
import { useHistory , useLocation } from 'react-router';
import { useClipboard } from 'use-clipboard-copy';

export const MemeGenerate = () =>{

    const [copied , setCopied] = useState(false);
    
    const history = useHistory();
    const location = useLocation();
    const clipboard = useClipboard();
    const url= new URLSearchParams(location.search).get('url');

    const copyLink = () =>{
       clipboard.copy(url);
       setCopied(true);

    };

    return (
        <div className={styles.container}>
        <button onClick={()=> history.push('/')} className={styles.newmeme}>
            New Meme
        </button>
            {url && <img src={url} alt="url"/> }
            <button onClick={copyLink} className={styles.copy}>
            {copied ? 'Link copied!' : 'Copy link'};

            </button>
           
        </div>
    );
}

