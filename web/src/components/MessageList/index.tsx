import styles from './styles.module.scss';
import logoImg from '../../assets/logo.svg';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

type Message = {
    id:string;
    text: string;
    user:{
        name: string;
        avatar_url: string;
    }
}

const messsageQueue: Message [] = [];

const socket = io('http://localhost:4000');

socket.on('new message', (newMessage: Message) =>{

    messsageQueue.push(newMessage);
})

export const MessageList = () => {

    const [messages, setMessages] = useState<Message[]>([]);


    useEffect(() => {
        const timer = setInterval(()=>{
            if(messsageQueue.length >0){
                setMessages(prevState =>[
                    messsageQueue[0],
                    prevState[0],
                    prevState[1],
                ].filter(Boolean))

                messsageQueue.shift();
            }
        }, 3000)
    }, [])

    useEffect(() => {
        api.get('messages/last3').then(response => {
            setMessages(response.data);      
                                       
            })
    }, [])
    return(
        <div className={styles.messageListWapper}>
            <img src={logoImg} alt="DoWhile 2021" />
            <ul className={styles.messageList}>
                {messages.map(message =>{
                    return(
                        <li key={message.id} className={styles.message}>
                        <p className={styles.messageContent}>{message.text}</p>
                        <div className={styles.messageUser}>
                            <div className={styles.userImage}>
                                <img src={message.user.avatar_url} alt={message.user.name} />
                            </div>
                            <span>{message.user.name}</span>
                        </div>
                    </li>      
                    )
                })}
                      
            </ul>
        </div>
    )
}