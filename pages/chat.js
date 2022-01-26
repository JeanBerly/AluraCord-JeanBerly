import configs from '../config.json';
import React from 'react';
const colors = configs.theme.colors;
export default function chatPage(){
    const [message, setMessage] = React.useState('');
    const [chatHistory, setChatHistory] = React.useState([]);
    let bloh = chatHistory.map((msg) =>{
        return(
            <div>{msg.user}: {msg.text}</div>
        )
    });
    function handleNewMessage(newMessage){
        const message = {
            id: chatHistory.length + 1,
            user: 'Jean',
            text: newMessage,
            date: '15/12/2022'
        }
        setChatHistory([
            ...chatHistory,
            message
        ]);
    }
    return(
        <>
            <ChatBox>
                <Header></Header>
                <Chat chatHistory={chatHistory}>
                    Msgs: {bloh}
                </Chat>
                <Footer handleNewMessage={handleNewMessage}></Footer>
            </ChatBox>
        </>
    )
}
function ChatBox(props){
    return (
        <>
            <div>{props.children}</div>
            <style jsx>{`
                div{
                    display: flex;
                    align-items: center;
                    position: relative;
                    flex-direction: column;
                    background-color: ${colors.neutrals[800]};
                    width: 90vw;
                    height: 85vh;
                }
            `}</style>
        </>
    )
}
function Header(props){
    return (
        <>
            <header>
                <span>Chat</span>
                <span>Logout</span>
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
                }
                span:nth-child(2){
                    padding: 10px;
                    display: inline-block;
                }
                span:nth-child(2):hover{
                    cursor: pointer;
                    background-color: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </>
    )
}
function Chat(props){
    return(
        <>
            <main>{props.children}</main>
            <style jsx>{`
                main{
                    display: flex;
                    flex-direction: column;
                    color: white;
                    width: 95%;
                    height: 85%;
                    background-color: ${colors.neutrals[700]};
                    border-radius: 20px;
                    margin: auto 0;
                }
            `}</style>
        </>
    )
}
// onChange={(event) =>{
//     const msg = event.target.value;
//     if (msg.charAt(msg.length - 1) == 13){
//         console.log('blohzada');
//     }
// }}
function Footer(props){
    return(
        <>
            <footer>
                <input type="text" placeholder="Enter your message here" onKeyPress={(event) =>{
                    if (event.key == 'Enter'){
                        const newMessage = event.target.value;
                        props.handleNewMessage(newMessage);
                        event.target.value = '';
                        // props.setChatHistory([
                        //     ...props.chatHistory,
                        //     event.target.value
                        // ]);
                        // event.target.value = '';
                        // pegar a mensagem e colocar no chat, verificar se a msg n esta vazia
                    }
                }} ></input>
                <div id="buttonEmojis"></div>
            </footer>
            <style jsx>{`
                footer{
                    display: flex;
                    position: relative;
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
                    font-size: 2rem;
                    width: 90%;
                    height: 100%;
                    border-radius: 20px;
                    background-color: ${colors.neutrals[900]};
                }
                #buttonEmojis{
                    display: block;
                    position: relative;
                    width: 80px;
                    height: 80px;
                    margin-right: auto;
                    border-radius: 50%;
                    background-color: white;
                }
                #buttonEmojis:hover{
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}