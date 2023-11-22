import { FormProps, ThemeProps } from "@rjsf/core";

import { withTheme } from "@rjsf/core";
import { FormTheme } from "./useGetForm";

// todo: make sure the library components are loaded on demand
// todo: add theme properties https://github.com/rjsf-team/react-jsonschema-form/tree/main/packages/semantic-ui#optional-semantic-ui-theme-properties
import { Theme as AntDTheme } from "@rjsf/antd";
import { Theme as ChakraTheme } from "@rjsf/chakra-ui";
import { Theme as MuiTheme } from "@rjsf/mui";

const themeMap: Record<FormTheme, ThemeProps> = {
  ANTD: AntDTheme,
  CHAKRA: ChakraTheme,
  MUI: MuiTheme,
  SEMANTIC: AntDTheme,
};

export const Form = ({ theme, ...props }: { theme: FormTheme } & FormProps) => {
  const Form = withTheme(themeMap[theme]);
  return <Form {...props} />;
};
