import * as React from "react";
import { useState } from "react";
import Resume from "../components/Resume";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Flag from "react-world-flags";
import { motion, AnimatePresence } from "framer-motion"; 
import { graphql, useStaticQuery } from "gatsby";

const flagStyles: React.CSSProperties = {
  width: 24,
};

const IndexPage: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "pl">("en");

  const toggleLanguage = (): void => {
    setLanguage((prevLanguage: "en" | "pl") => (prevLanguage === "pl" ? "en" : "pl"));
  };  

  return (
    <Box display="flex" justifyContent="center" position="relative">
      <AnimatePresence mode="wait"> {/* AnimatePresence for language switching */}
        <motion.div
          key={language} 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }} 
        >
          <Resume language={language} /> {/* Resume component */}
        </motion.div>
      </AnimatePresence>

      {/* Language toggle button */}
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 1000,
        }}
      >
        <IconButton
          sx={{
            width: "80px",
            height: "80px",
            boxShadow: 3,
            backgroundColor: 'white', 
            transition: "background 1.7s ease", 
            "&:hover": {
              background: "#e1e1e1"
            },
          }}
          onClick={toggleLanguage}
        >
          {language === "pl" ? (
            <Flag code="USA" style={flagStyles} />
          ) : (
            <Flag code="POL" style={flagStyles} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export const Head: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <>
      <title>{data.site.siteMetadata.title}</title>
      <meta name="description" content={data.site.siteMetadata.description} />
    </>
  );
};

export default IndexPage;
