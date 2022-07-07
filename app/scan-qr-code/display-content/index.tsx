import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

const Container=styled.View`
    width: 95%;

    padding: 0;
    background-color: rgba(72,128,237,1);
    border-width: 0;
    borderRadius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const Heading=styled.View`
        min-height: 25px;
        display: flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        padding:10px;
        `;

const HeaderText=styled.Text`
    color:white;
`;

const Content=styled.View`
        flex:1;
        background-color: rgba(255,255,255,1);
        width: 100%;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        padding: 10px;
        margin:0;
 `;
 const CodeText=styled.Text`
        flex:1;
        background-color: rgba(255,255,255,1);
        width: 100%;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        padding:10px;
        margin:0;
 `;

interface Props{
    title:string;
    content:string;
}

export const DisplayContent:React.FC<Props>=({title,content})=>{

    return (<Container>
        <Heading>
            <HeaderText>{title}</HeaderText>
        </Heading>
        <Content>
            <ScrollView>
                <CodeText>{content}</CodeText>
            </ScrollView>

        </Content>

    </Container>)

};
