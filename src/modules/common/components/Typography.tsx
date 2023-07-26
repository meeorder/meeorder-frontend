import { Typography as AntTypography } from "antd";
import { type TextProps } from "antd/es/typography/Text";
import { type TitleProps } from "antd/es/typography/Title";
import { type RefAttributes } from "react";

export type TypographyTitleProps = TitleProps &
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
}: TypographyTitleProps) => {
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

const headerLevels = [1, 2, 3, 4, 5] as const;

function createHeader(levels: typeof headerLevels) {
  return levels.reduce(
    (acc, level) => {
      acc[`H${level}`] = (props: TypographyTitleProps) => (
        <Header level={level} {...props} />
      );
      return acc;
    },
    {} as Record<`H${(typeof headerLevels)[number]}`, typeof Header>,
  );
}

export const { H1, H2, H3, H4, H5 } = createHeader(headerLevels);

export type TypographyTextProps = TextProps & RefAttributes<HTMLElement>;

export const Text = ({ children, ...restProps }: TypographyTextProps) => {
  return <AntTypography.Text {...restProps}>{children}</AntTypography.Text>;
};
