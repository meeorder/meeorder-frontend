import { Typography as AntTypography } from "antd";
import { type TextProps as AntTextProps } from "antd/es/typography/Text";
import { type TitleProps } from "antd/es/typography/Title";
import { type RefAttributes } from "react";

export type HeaderProps = TitleProps &
  RefAttributes<HTMLElement> & {
    bold?: boolean;
    medium?: boolean;
    regular?: boolean;
  };

const weightToFontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

const getFontWeight = (bold: boolean, medium: boolean, regular: boolean) => {
  switch (true) {
    case bold:
      return weightToFontWeight.bold;
    case medium:
      return weightToFontWeight.medium;
    case regular:
      return weightToFontWeight.regular;
    default:
      return weightToFontWeight.medium;
  }
};

const Header = ({
  level,
  bold = false,
  medium = false,
  regular = false,
  style,
  ...restProps
}: HeaderProps) => {
  return (
    <AntTypography.Title
      level={level}
      style={{
        fontWeight: getFontWeight(bold, medium, regular),
        ...style,
      }}
      {...restProps}
    />
  );
};

export const H1 = (props: HeaderProps) => <Header level={1} {...props} />;
export const H2 = (props: HeaderProps) => <Header level={2} {...props} />;
export const H3 = (props: HeaderProps) => <Header level={3} {...props} />;
export const H4 = (props: HeaderProps) => <Header level={4} {...props} />;
export const H5 = (props: HeaderProps) => <Header level={5} {...props} />;

export type TextProps = AntTextProps & RefAttributes<HTMLElement>;

export const Text = ({ children, style, ...restProps }: TextProps) => {
  return (
    <AntTypography.Text
      {...restProps}
      style={{
        color: style?.color,
        ...style,
      }}
    >
      {children}
    </AntTypography.Text>
  );
};
