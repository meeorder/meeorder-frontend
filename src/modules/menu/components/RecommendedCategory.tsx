import { type CategoryProps } from "@/modules/menu/components/Category";
import { Card, Col, Row } from "antd";

const RecommendedCategory: React.FC<CategoryProps> = ({ foods, category }) => {
  return (
    <>
      <Card
        title={category.name}
        id={category?.id}
        style={{
          scrollMarginTop: "112px", // very important for anchor to work
        }}
      >
        <Row>
          <Col
            span={12}
            style={{
              overflow: "hidden",
            }}
          >
            <pre>{JSON.stringify(foods?.[0], null, 2)}</pre>
          </Col>
          <Col
            span={12}
            style={{
              overflow: "hidden",
            }}
          >
            <pre>{JSON.stringify(foods?.[1], null, 2)}</pre>
          </Col>
        </Row>
        <Row>
          <Col
            span={12}
            style={{
              overflow: "hidden",
            }}
          >
            <pre>{JSON.stringify(foods?.[2], null, 2)}</pre>
          </Col>
          <Col
            span={12}
            style={{
              overflow: "hidden",
            }}
          >
            <pre>{JSON.stringify(foods?.[3], null, 2)}</pre>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default RecommendedCategory;
