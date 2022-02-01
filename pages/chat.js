import configs from '../config.json';
import React from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
const stickers = configs.stickers;
export async function getServerSideProps(context) {
    //Connect with supabase
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    const SUPABASE_URL = process.env.SUPABASE_URL

    return {
        props: {
            SUPABASE_ANON_KEY,
            SUPABASE_URL
        },
    }
}

function updateRealTime(supabaseClient, addMessage) {
    return supabaseClient
        .from('chatHistory')
        .on('INSERT', (msg) => {
            addMessage(msg.new);
        })
        .subscribe();
}

const colors = configs.theme.colors;
// IMPORTANT! IN AN IDEAL SCENARIO YOU SHOULD NOT MAKE THIS KEY VISIBLE TO OTHERS!!
// const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
// const SUPABASE_URL = process.env.SUPABASE_URL;

export default function chatPage({ SUPABASE_ANON_KEY, SUPABASE_URL }) {
    const router = useRouter();
    const idMsg = 0;
    const [message, setMessage] = React.useState('');
    const [stickerTabOpen, setstickerTabOpen] = React.useState(false);
    const [chatHistory, setChatHistory] = React.useState([]);
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const username = router.query.user;
    const supabaseData = supabaseClient
        .from('chatHistory')
        .select('*')
        .then((data) => {
            // console.log('Supabase data:', data);
        });
    React.useEffect(() => {
        supabaseClient
            .from('chatHistory')
            .select('*')
            .then(({ data }) => {
                console.log('supabase: ', data);
                setChatHistory(data);
            });
        //updateRealTime(supabaseClient);
        const subscription = updateRealTime(supabaseClient, (newMessage) => {
            // To make sure we are using the chatHistory after asking for supabase
            setChatHistory((messageList) => {
                return [
                    ...messageList,
                    newMessage,
                ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);
    let bloh = chatHistory.map((msg) => {
        console.log(msg);
        let date;
        // We have to guarantee that is coming from the server otherwise we don't render the msg.
        if (msg.created_at == null) return
        else {
            const aux = msg.created_at.split('T');
            date = aux[0];
        }
        const imgGit = `https://github.com/${msg.user}.png`;
        return (
            <>
                <div key={msg.id}>
                    <header><img src={imgGit}></img><span> {msg.user} {date}</span></header>
                    <button value={msg.id} onClick={(event) => {
                        let aux = chatHistory.filter((msg) => {
                            return (!((msg.id) == event.target.value));
                        });
                        console.log(msg.id);
                        supabaseClient
                            .from('chatHistory')
                            .delete()
                            .match({ id: `${msg.id}` })
                            .then(({ data }) => {
                                console.log(data);
                            })

                        setChatHistory([
                            ...aux,
                        ]);
                    }}>X</button>
                    {msg.text.startsWith(':sticker:')
                        ? (
                            <img className="bloh" src={msg.text.replace(':sticker:', '')}></img>
                        )
                        : (
                            <p>{msg.text}</p>
                        )
                    }
                </div>
                <style jsx>{`
                    div{
                        display: block;
                        position: relative;
                        height: fit-content;
                    }
                    img{
                        position: relative;
                        margin-top: 0;
                        margin-left: 1  %;
                        height: 2rem;
                        border-radius: 50%;
                    }
                    .bloh{
                        border-radius: 0;
                        width: calc(50px + 10vmax);
                        height: auto;
                    }
                    span{
                        position: absolute;
                        top: 0.5rem;
                        overflow-y: auto;
                    }
                    p{
                        position: relative;
                        color: white;
                        min-height: fit-content;
                        margin-left: 1%;
                        border-radius: 2px;
                    }
                    button{
                        display: block;
                        position: absolute;
                        width: 30px;
                        height: 30px;
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
            user: username,
            text: newMessage,
            // date: '15/12/2022'
        }
        supabaseClient
            .from('chatHistory')
            .insert([
                message
            ])
            .then(({ data }) => {
                console.log("Mensagem enviada");
            })
        setChatHistory([
            ...chatHistory,
            message,
        ]);
    }
    return (
        <>
            <ChatBox>
                <Header router={router}></Header>
                <Chat chatHistory={chatHistory}>
                    {bloh}
                </Chat>
                <Footer stickerTabOpen={stickerTabOpen} setstickerTabOpen={setstickerTabOpen} handleNewMessage={handleNewMessage}></Footer>
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
                    background-color: rgba(0, 0, 0, 0.3);
                    box-shadow: inset 0 0 2000px rgba(0, 0, 0, 1);
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
                <span onClick={() => {
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
            `}</style>
        </>
    )
}
function TabStickers(props) {
    const imgStickers = stickers.map((url) => {
        return (
            <>
                <img src={url} className="sticker" onClick={(event) => {
                    const newMessage = ':sticker:' + event.target.src;
                    props.handleNewMessage(newMessage);
                }}></img>
                <style jsx>{`
                    img{
                        display: block;
                        width: 45%;
                    }
                `}</style>
            </>
        )
    });
    return (
        <>
            <div>{imgStickers}</div>
            <style jsx>{`
                div{
                    display: flex;
                    flex-wrap: wrap;
                    position: absolute;
                    width: calc(100px + 15vmax);
                    max-height: 500px;
                    right: 50%;
                    bottom: 50%;
                    background-color: black;
                    z-index: 1;
                    overflow-y: auto;
                    color: white;
                    border-radius: 20px;
                }
            `}</style>
        </>
    )
}
function Footer(props) {
    const isOpen = props.stickerTabOpen;
    return (
        <>
            <footer>
                <input id="textoMsg" autoComplete='off' type="text" placeholder="Enter your message here" onKeyPress={(event) => {
                    if (event.key == 'Enter') {
                        const str = event.target.value
                        if (!(str.length == 0)) {
                            const newMessage = event.target.value;
                            props.handleNewMessage(newMessage);
                        }
                        event.target.value = '';
                    }

                }} ></input>
                <button id="buttonSticker" onClick={(event) => {
                    props.setstickerTabOpen(!isOpen);
                }} id="buttonEmojis">Send
                    {isOpen && (
                        <TabStickers handleNewMessage={props.handleNewMessage} >aaa</TabStickers>
                    )}
                </button>
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