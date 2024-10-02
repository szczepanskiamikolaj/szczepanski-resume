import React from "react";
import i18n from "./src/components/i18n";
import { I18nextProvider } from "react-i18next";

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
    <I18nextProvider i18n={i18n}>
      {element}
    </I18nextProvider>
  );

export const onInitialClientRender = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
  document.head.appendChild(link);
};
