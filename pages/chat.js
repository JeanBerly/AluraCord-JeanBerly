import configs from '../config.json';
import React from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

export async function getServerSideProps(context) {
    //Conexão com o SupaBase
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    const SUPABASE_URL = process.env.SUPABASE_URL

    return {
        props: {
            SUPABASE_ANON_KEY,
            SUPABASE_URL
        },
    }
}

const colors = configs.theme.colors;
// IMPORTANT! IN AN IDEAL SCENARIO YOU SHOULD NOT MAKE THIS KEY VISIBLE TO OTHERS!!
// const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
// const SUPABASE_URL = process.env.SUPABASE_URL;

export default function chatPage({SUPABASE_ANON_KEY, SUPABASE_URL}) {
    const router = useRouter();
    const idMsg = 0;
    const [message, setMessage] = React.useState('');
    const [chatHistory, setChatHistory] = React.useState([]);
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const supabaseData = supabaseClient
        .from('chatHistory')
        .select('*')
        .then((data) =>{
            console.log('Supabase data:', data);
        });
    React.useEffect(() =>{
        const supabaseData = supabaseClient
            .from('chatHistory')
            .select('*')
            .then(({ data }) =>{
                setChatHistory(data);
            });
    }, []);
    let bloh = chatHistory.map((msg) => {
        const imgGit = `https://github.com/${msg.user}.png`;
        return (
            <>
                <div key={msg.id} >
                    <img src={imgGit}></img><span>{msg.user} {msg.date}</span>
                    <button value={msg.id} onClick={(event) => {
                        let aux = chatHistory.filter((msg) => {
                            return (!((msg.id) == event.target.value));
                        });
                        setChatHistory([
                            ...aux,
                        ]);
                    }} >X</button>
                    <p>{msg.text}</p>
                </div>
                <style jsx>{`
                    div{
                        display: block;
                        position: relative;
                        height: 10%;
                        min-height: fit-content;
                        background-color: rgba(0, 0, 0, 0.1);
                    }
                    div:nth-child(odd){
                        background-color: rgba(0, 0, 0, 0.2);
                    }
                    img{
                        position: relative;
                        height: 2rem;
                        border-radius: 50%;
                    }
                    span{
                        position: absolute;
                        top: 0.5rem;
                        overflow-y: auto;
                    }
                    p{
                        position: relative;
                        min-height: fit-content;
                    }
                    button{
                        display: block;
                        width: 30px;
                        height: 30px;
                        position: absolute;
                        top: 0;
                        right: 0;
                        background-color: red;
                    }
                `}</style>
            </>
        )
    });
    function handleNewMessage(newMessage) {
        const message = {
            // id: Date.now(),
            user: 'JeanBerly',
            text: newMessage
            // date: '15/12/2022'
        }
        supabaseClient
            .from('chatHistory')
            .insert([
                message
            ])
            .then(({ data }) =>{
                setChatHistory([
                    ...chatHistory,
                    data[0],
                ]);
            })
        // setChatHistory([
        //     ...chatHistory,
        //     message
        // ]);
    }
    return (
        <>
            <ChatBox>
                <Header router={router}></Header>
                <Chat chatHistory={chatHistory}>
                    {bloh}
                </Chat>
                <Footer handleNewMessage={handleNewMessage}></Footer>
            </ChatBox>
        </>
    )
}
function ChatBox(props) {
    return (
        <>
            <div>{props.children}</div>
            <style jsx>{`
                div{
                    display: flex;
                    position: absolute;
                    align-items: center;
                    position: relative;
                    flex-direction: column;
                    width: 90vw;
                    height: 85vh;
                }
                div:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: inherit;
                }
                div:before {
                    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
                    filter: blur(5px);
                }
            `}</style>
        </>
    )
}
function Header(props) {
    return (
        <>
            <header>
                <span>Chat</span>
                <span onClick={() =>{
                    props.router.push('/');
                }}>Logout</span>
            </header>
            <style jsx>{`
                *{
                    color: white;
                }
                header{
                    display: flex;
                    position: relative;
                    width: 95%;
                    position: relative;
                }
                span{
                    font-size: 1.2rem;
                }
                span:first-of-type{
                    display: inline-block;
                    padding: 10px;
                    margin-right: auto;
                    color: white;
                }
                span:nth-child(2){
                    padding: 10px;
                    display: inline-block;
                }
                span:nth-child(2):hover{
                    cursor: pointer;
                    background-color: rgba(0, 0, 0, 0.8);
                }
            `}</style>
        </>
    )
}
function Chat(props) {
    return (
        <>
            <main>{props.children}</main>
            <style jsx>{`
                main{
                    display: flex;
                    position: relative;
                    flex-direction: column;
                    color: white;
                    width: 95%;
                    height: 85%;
                    border-radius: 20px;
                    margin: auto 0;
                    min-height: fit-content;
                    overflow-y: auto;
                }
                main:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: inherit;
                }
                main:before {
                    box-shadow: inset 0 0 2000px rgba(0, 0, 0, .95);
                    filter: blur(2px);
                }
            `}</style>
        </>
    )
}
function Footer(props) {
    return (
        <>
            <footer>
                <input id="textoMsg" type="text" placeholder="Enter your message here" onKeyPress={(event) => {
                    if (event.key == 'Enter') {
                        const str = event.target.value
                        if (!(str.length == 0)) {
                            const newMessage = event.target.value;
                            props.handleNewMessage(newMessage);
                        }
                        event.target.value = '';
                    }
                }} ></input>
                <button onClick={() =>{
                    const msg = document.getElementById("textoMsg");
                    if (!(msg.value.length == 0)){
                        props.handleNewMessage(msg.value);
                        msg.value = '';
                    }
                }} id="buttonEmojis">Send</button>
            </footer>
            <style jsx>{`
                footer{
                    display: flex;
                    position: sticky;
                    bottom: 0;
                    justify-content: space-around;
                    align-items: center;
                    width: 95%;
                    height: 10%;
                    margin: auto 0;
                }
                input[type="text"]{
                    display: block;
                    margin-right: auto;
                    color: white;
                    font-size: 1.5rem;
                    width: 90%;
                    height: 100%;
                    border-radius: 20px;
                    background-color: ${colors.neutrals[900]};
                    overflow-wrap: scroll;
                }
                #buttonEmojis{
                    display: block;
                    position: relative;
                    width: calc(15px + 3.5vmax);
                    height: calc(15px + 3.5vmax);
                    margin-right: auto;
                    border-radius: 50%;
                    font-size: calc(7.5px + 1vmax);
                    background-color: black;
                    color: white;
                }
                #buttonEmojis:hover{
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}