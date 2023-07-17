import styled from "@emotion/styled";
import React from "react";

type WireFrameProps = {
  contentNode?: React.ReactNode;
  cardColor?: React.CSSProperties["color"];
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
};

const WireFrame: React.FC<WireFrameProps> = ({
  contentNode = "WireFrame",
  cardColor = "#ff92dc",
  width,
  height,
}) => {
  return (
    <StyledCard cardColor={cardColor} height={height} width={width}>
      {contentNode}
    </StyledCard>
  );
};

export default WireFrame;

type StyledCardProps = {
  cardColor: string;
  height?: React.CSSProperties["height"];
  width?: React.CSSProperties["width"];
};

const StyledCard = styled.div<StyledCardProps>`
  border: 5px solid ${(props) => props.cardColor};
  border-radius: 10px;
  height: ${(props) => props.height ?? "100%"};
  width: ${(props) => props.width ?? "100%"};
  color: ${(props) => props.cardColor};
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  font-size: large;
  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: ${(props) => props.cardColor};
    opacity: 0.1;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;
