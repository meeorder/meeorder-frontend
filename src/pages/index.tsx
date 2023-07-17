import AppLayout from "@/modules/layout/AppLayout";
import Head from "next/head";
import { useState } from "react";
import { Button, Typography } from "antd";
import { type LayoutType } from "@/modules/layout/types";

export default function Home() {
  const [layoutType, setLayoutType] = useState<LayoutType>("user");

  return (
    <>
      <Head>
        <title>MeeOrder</title>
        <meta name="description" content="MeeOrder Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout layoutType={layoutType}>
        <Button
          style={{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            overflow: "hidden",
          }}
          size="large"
          type="primary"
          onClick={() =>
            setLayoutType((oldType) => (oldType === "admin" ? "user" : "admin"))
          }
        >
          <Typography.Title level={1}>
            This is layout for {layoutType}
          </Typography.Title>
          <Typography.Title type="warning">
            click to Toggle Layout
          </Typography.Title>
        </Button>
      </AppLayout>
    </>
  );
}
