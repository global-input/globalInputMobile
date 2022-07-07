import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const Container=styled.View`
        margin:0;
        bottom:0;
        left:0;
        position:absolute;
        display: flex;
        flex-direction: column;
        justify-content:flex-end;
        align-items:center;
        width:100%;
        height:100%;
        z-index:10;

        background-color:transparent;
`;

const TabContainer=styled.View`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        background-color: rgba(72,128,237,1);
        width:100%;
        border-color: #333333;
        border-style: solid;
        border-top-width: 1px;
        padding-top: 5px;
        padding-left: 5px;
        padding-right:5px;
        padding-bottom:5px;
        height:70px;
`;


const MenuText = styled.Text`
        color:#FFFFFF;
        font-size:10px;
`;



export const Footer:React.FC = ({children})=>{
        return (<Container>
                        {children}
                </Container>
                );

};
const styles=StyleSheet.create({
        content:{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                width:"100%"
        }
});

export const Tabs:React.FC = ({children}) => (
        <TabContainer>
                <ScrollView horizontal={true} contentContainerStyle={styles.content}>

                {children}
                </ScrollView>

        </TabContainer>
)
