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
                    max-width: 100vw;
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
            @media (max-width: 1116px){
                #LoginBox{
                    align-items: center;
                    justify-content: center;
                    min-width: 90vw;
                    flex-direction: column;
                    min-height: 50vh;
                }
            }
        `}
        </style>
    );
}
export default function MyPage({ Component, pageProps }){
    return (
        <>
            <GlobalStyle></GlobalStyle>
            <PageBackground>
                <Component {...pageProps} />
            </PageBackground>
        </>
    );
}