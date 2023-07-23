import AddonsCard from "@/modules/menu/components/AddonsCard";
import { addons } from "@/modules/mock/addons";
import { foods } from "@/modules/mock/foods";
import styled from "@emotion/styled";
import { Input, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

const FoodDetail = () => {
  const router = useRouter();
  const { foodId } = router.query;

  const food = foods.find((food) => food.id === foodId);

  return (
    <>
      <LayoutContainer>
        <Image
          src={food?.imagePath ?? ""}
          alt={food?.name ?? ""}
          width={1000}
          height={1000}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "264px",
          }}
        />
        <ContentContainer>
          <Typography.Title level={4}>{food?.name}</Typography.Title>
          <Typography.Text>
            Homemade honey bread toast with butter on top with blueberry
            homemade jam.
          </Typography.Text>
          <AddonContainer>
            {addons.map((addon) => (
              <AddonsCard key={addon.id} addons={addon} />
            ))}
          </AddonContainer>
          <AdditionalRequest>
            <Typography.Title style={{ marginLeft: "8px" }} level={5}>
              Additional Request
            </Typography.Title>
            <Input.TextArea
              style={{
                borderRadius: "12px",
                height: "55px",
              }}
              autoSize={{ minRows: 4, maxRows: 6 }}
              placeholder="E.g No Carb"
            />
          </AdditionalRequest>
        </ContentContainer>
      </LayoutContainer>
    </>
  );
};

export default FoodDetail;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.antd.colorBgBase};
`;

const ContentContainer = styled.div`
  margin: 20px;
`;

const AddonContainer = styled.div`
  margin-block: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AdditionalRequest = styled.div``;
