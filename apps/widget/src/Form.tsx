import { FormProps, ThemeProps } from "@rjsf/core";

import { withTheme } from "@rjsf/core";
import { FormTheme } from "./useGetForm";

// todo: make sure the library components are loaded on demand
import { Theme as AntDTheme } from "@rjsf/antd";
import { Theme as ChakraTheme } from "@rjsf/chakra-ui";

const themeMap: Record<FormTheme, ThemeProps> = {
  ANTD: AntDTheme,
  CHAKRA: ChakraTheme,
  // todo: replace
  MUI: AntDTheme,
  SEMANTIC: AntDTheme,
};

export const Form = ({ theme, ...props }: { theme: FormTheme } & FormProps) => {
  const Form = withTheme(themeMap[theme]);
  return <Form {...props} />;
};
