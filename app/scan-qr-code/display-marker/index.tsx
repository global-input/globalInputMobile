import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';




const progressStyle = {
    width: "100%",
    height: "10%",
    borderColor: 'rgba(102, 102, 0,1)',
    borderStyle: 'solid',
    borderBottomWidth: 1,
};

const startAnimation = (progress:Animated.Value, windowHeight:number) => {
    let running = true;


    const animate = () => {
        Animated.timing(progress, {
            toValue: windowHeight,
            duration: 4000,
            useNativeDriver:false

        }).start((o) => {
            if (running && o.finished) {
                progress.setValue(0);
                animate();
            }
        });
    };
    animate();
    return () => (running = false);
};
export const DisplayMarker = () => {
    const progress = useRef(new Animated.Value(10));
    const scanWindowHeight=250;
    useEffect(() => {

        const stop=startAnimation(progress.current,scanWindowHeight);
        return ()=>{
            stop()
        };
    }, [scanWindowHeight]);
    const animatedStyle={ ...progressStyle, height: progress.current } as any;

    return (
        <Container>
            <ScanWindow scanHeight={scanWindowHeight}>
                <Animated.View style={animatedStyle}>

                </Animated.View>
            </ScanWindow>

        </Container>

    );
}
const Container=styled.View`
    width:100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: transparent;
`;
interface ScanWindowProps{
    scanHeight:number;
}
const ScanWindow=styled.View<ScanWindowProps>`
        height: ${props=>props.scanHeight}px;
        width: 250px;
        border:2px solid rgba(72,128,237,1);
        border-radius: 15px;
        background-color: transparent;
        padding: 0;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
`;
