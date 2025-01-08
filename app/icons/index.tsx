import React from 'react';

import styled from 'styled-components/native';

interface SelectedProps {
  selected?: boolean;
}
const Container = styled.View<SelectedProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-color: white;
  border-style: solid;
  border-bottom-width: ${(props: {selected: any}) =>
    props.selected ? 1 : 0}px;
`;
const Image = styled.Image<SelectedProps>``;

const LabelText = styled.Text<SelectedProps>`
  color: #ffffff;
  font-size: 10px;
  font-weight: ${(props: {selected: any}) => (props.selected ? 500 : 300)};
`;

const TouchableHighlight = styled.TouchableHighlight`
  margin: 0;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const images = {
  system: {
    back: require('./system/back.png'),
    cancel: require('./system/cancel.png'),
    browser: require('./system/browser.png'),
    clipboard: {
      copy: require('./system/clipboard/copy.png'),
    },
  },
};

interface IconProps extends SelectedProps {
  label: string;
  image: any;
  selected?: boolean;
}
const SystemIcon: React.FC<IconProps> = ({selected, image, label}) => (
  <TouchableHighlight>
    <Container selected={selected}>
      <Image source={image} selected={selected} />
      <LabelText selected={selected}>{label}</LabelText>
    </Container>
  </TouchableHighlight>
);

interface Props {
  label: string;
  selected?: boolean;
}
export const systemIcons = {
  Back: ({label, selected}: Props) => (
    <SystemIcon image={images.system.back} label={label} selected={selected} />
  ),
  Cancel: ({label, selected}: Props) => (
    <SystemIcon
      image={images.system.cancel}
      label={label}
      selected={selected}
    />
  ),
  Browser: ({label, selected}: Props) => (
    <SystemIcon
      image={images.system.browser}
      label={label}
      selected={selected}
    />
  ),
  clipboard: {
    copy: ({label, selected}: Props) => (
      <SystemIcon
        image={images.system.clipboard.copy}
        label={label}
        selected={selected}
      />
    ),
  },
};
