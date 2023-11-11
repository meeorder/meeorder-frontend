import { H4 } from "@/modules/common/components/Typography";
import styled from "@emotion/styled";
import { type Icon } from "@phosphor-icons/react";

type CardTitleProps = {
  title: string;
  Icon: Icon;
};

const CardTitle: React.FC<CardTitleProps> = ({ title, Icon }) => {
  return (
    <TitleContainer>
      <Icon size={24} color="#595959" />
      <H4
        medium
        style={{
          color: "#595959",
        }}
      >
        {title}
      </H4>
    </TitleContainer>
  );
};

export default CardTitle;

const TitleContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;
