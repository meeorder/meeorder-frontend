import { Typography as AntTypography } from "antd";
import { type TextProps } from "antd/es/typography/Text";
import { type TitleProps } from "antd/es/typography/Title";
import { type RefAttributes } from "react";

type TypographyTitleProps = TitleProps & RefAttributes<HTMLElement>;

export const H1 = ({
  children,
  level = 1,
  ...restProps
}: TypographyTitleProps) => {
  return (
    <AntTypography.Title level={level} {...restProps}>
      {children}
    </AntTypography.Title>
  );
};

export const H2 = ({
  children,
  level = 2,
  ...restProps
}: TypographyTitleProps) => {
  return (
    <AntTypography.Title level={level} {...restProps}>
      {children}
    </AntTypography.Title>
  );
};

export const H3 = ({
  children,
  level = 3,
  ...restProps
}: TypographyTitleProps) => {
  return (
    <AntTypography.Title level={level} {...restProps}>
      {children}
    </AntTypography.Title>
  );
};

export const H4 = ({
  children,
  level = 4,
  ...restProps
}: TypographyTitleProps) => {
  return (
    <AntTypography.Title level={level} {...restProps}>
      {children}
    </AntTypography.Title>
  );
};

export const H5 = ({
  children,
  level = 5,
  ...restProps
}: TypographyTitleProps) => {
  return (
    <AntTypography.Title level={level} {...restProps}>
      {children}
    </AntTypography.Title>
  );
};

type TypographyTextProps = TextProps & RefAttributes<HTMLElement>;

export const Text = ({ children, ...restProps }: TypographyTextProps) => {
  return <AntTypography.Text {...restProps}>{children}</AntTypography.Text>;
};
