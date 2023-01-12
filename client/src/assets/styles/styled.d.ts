import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      main: string;
      sub1: string;
      sub2: string;
      sub3: string;
    };
    font: {
      h1: string;
      h2: string;
      nav: string;
      medium: string;
      small: string;
    };
  }
}
