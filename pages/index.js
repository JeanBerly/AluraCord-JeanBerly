import appConfig from '../config.json';
import React from 'react';
import { useRouter } from 'next/router';
import chatPage from './chat';
const colors = appConfig.theme.colors;
function FormBox(props){
    return (
        <>
            <form id="FormBox" onSubmit={function(eventInfo){
                eventInfo.preventDefault();
                props.router.push('/chat');
            }}>
                <div id="FormBox__containerTop">
                    <h2>Welcome Back!</h2>
                    <p>AluraCord - Alura Bloh</p>
                </div>
                <div id="FormBox__containerBottom">
                    <input type="text" id="username" placeholder='Insert your username' onChange={function (event){
                        const name = event.target.value;
                        props.setUsername(name);
                    }} ></input>
                    <input type="submit" value='Enter'></input>
                </div>
            </form>
            <style jsx>{`
                form{
                    display: flex;
                    position: relative;
                    max-width: 50%;
                    flex-direction: column;
                    justify-content: space-around;
                    position: relative;
                    margin-left: 5%;
                    padding: 0 10px;
                }
                form *{
                    text-align: center;
                    margin: 10px;
                }
                #FormBox__containerTop{
                    background-color: rgba(0, 0, 0, 0.6);
                    border-radius: 50px;
                    padding: 5px;
                }
                h2{
                    // color: ${colors.neutrals[200]};
                    color: ${colors.primary[400]};
                }
                p{
                    // color: ${colors.neutrals[300]};
                    color: ${colors.primary[300]}
                }
                #FormBox__containerBottom{
                    display: flex;
                    flex-direction: column;
                    justify-content: start;
                    height: 40%;
                    text-align: center;
                }
                input[id='username']{
                    display: block;
                    margin: 4px auto;
                    width: 100%;
                    height: 30%;
                    background-color: ${colors.neutrals[600]};
                    border-style: solid;
                    border-color: ${colors.neutrals[100]};
                    border-radius: 15px;
                    color: pink;
                }
                input[type='submit']{
                    display: block;
                    margin: 4px auto;
                    width: 100%;
                    height: 30%;
                    color: ${colors.neutrals[100]};
                    background-color: ${colors.primary[400]};
                    border-color: ${colors.neutrals[100]};
                    border-style: solid;
                    border-radius: 15px;
                }
                ::placeholder{
                    text-align: center;
                    // color: ${colors.neutrals[200]};
                    color: ${colors.primary[400]};
                }
            `}
            </style>
        </>
    )
}
function ProfileBox(props){
    const usernameImg = `https://github.com/${props.username}.png`;
    return (
        <>
            <div id="containerImg">
                <img src={usernameImg} onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src="https://pbs.twimg.com/profile_images/1183307306995306496/P1K5Kt_5_400x400.jpg";
                }}>
                </img>
                <p>{props.username}</p>
            </div>
            <style jsx>{`
                #containerImg{
                    display: flex;
                    flex-direction: column;
                    width: 30%;
                    margin-right: 5%;
                    // background-color: ${colors.neutrals[900]};
                    background-color: ${colors.primary[900]};
                    border-radius: 20px;
                    margin: 20px;
                }
                img{
                    display: block;
                    position: relative;
                    max-width: 80%;
                    margin: 10px auto;
                    border-style: solid;
                    border-width: 5px;
                    border-color: ${colors.primary[100]};
                    border-radius: 50%;
                }
                #containerImg p{
                    display: block;
                    position: relative;
                    margin: auto;
                    padding: 5px;
                    color: white;
                    min-width: 100%;
                    max-width: 100%;
                    background-color: ${colors.primary[900]};
                    border-radius: 20px;
                    text-align: center;
                }
            `}</style>
        </>
    )
}
function LoginBox(props){
    return (
        <>
            <div id="LoginBox">
                {props.children}
            </div>
            <style jsx>{`
                #LoginBox{
                    display: flex;
                    position: relative;
                    justify-content: space-around;
                    width: 40vw;
                    height: 30vh;
                    // background-color: ${colors.neutrals[600]};
                    background-color: white;
                    border-radius: 1rem;
                    background: inherit;
                }
                #LoginBox:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: inherit;
                }
                #LoginBox:before {
                    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .1);
                    filter: blur(5px);
                }
            `}</style>
        </>
    );
}
function HomePage(){
    const [username, setUsername] = React.useState('JeanBerly');
    const router = useRouter();
    return (    
        <>
            <LoginBox>
                <FormBox username={username} setUsername={setUsername} router={router}></FormBox>
                <ProfileBox username={username}></ProfileBox>
            </LoginBox>
        </>
    )
}
export default HomePage