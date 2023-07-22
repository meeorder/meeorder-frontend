import "@emotion/react";
import { type GlobalToken } from "antd";

declare module "@emotion/react" {
  export interface Theme {
    antd: GlobalToken;
  }
}
