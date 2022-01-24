import appConfig from '../config.json';
const colors = appConfig.theme.colors;
function GlobalStyle(){
    return(
        <style global jsx>{`
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
            }
            body{
                font-family: 'Serif', Times New Roman;
            }
            @media (max-width: 768px){
                #LoginBox{
                    align-items: center;
                    width: fit-content;
                    flex-direction: column;
                }
            }
        `}
        </style>
    );
}
function PageBackground(props){
    return(
        <>
            <div>
                {props.children}
            </div>
            <style jsx>{
            `
                div{
                    display: flex;
                    min-width: 100vw;
                    min-height: 100vh;
                    justify-content: center;
                    align-items: center;
                    background-color: green;
                    background-image: url('https://wallpaperaccess.com/full/3854450.jpg');
                    background-size: cover;
                }
            `}
            </style>
        </>
    );
}
function LoginBox(props){
    const text = props.children;
    const username = `https://github.com/${props.username}.png`;
    return (
        <>
            <div id="LoginBox">
                <form>
                    <div id="LoginBox__containerTop">
                        <h2>Welcome Back, {props.username}</h2>
                        <p>AluraCord - Alura Bloh</p>
                    </div>
                    <div id="LoginBox__containerBottom">
                        <input type="text" id="username" placeholder='Insert your username'></input>
                        <input type="button" value='Enter'></input>
                    </div>
                </form>
                <div id="containerImg">
                    <img src={username}>
                    </img>
                    <p>{props.username}</p>
                </div>
            </div>
            <style jsx>{`
                #LoginBox{
                    display: flex;
                    position: relative;
                    justify-content: space-between;
                    min-width: 35vw;
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
                #LoginBox__containerTop{
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
                #LoginBox__containerBottom{
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
                input[type='button']{
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
                    margin: auto;
                    padding: 5px;
                    color: white;
                    background-color: ${colors.primary[999]};;
                    border-radius: 20px;
                }
                ::placeholder{
                    text-align: center;
                    // color: ${colors.neutrals[200]};
                    color: ${colors.primary[400]};
                }
            `}</style>
        </>
    );
}
function HomePage() {
    const username = 'JeanBerly'
    return (    
        <>
                <GlobalStyle/>
                <PageBackground>
                    <LoginBox username={username}>
                    </LoginBox>
                </PageBackground>
        </>
    )
}
  
export default HomePage