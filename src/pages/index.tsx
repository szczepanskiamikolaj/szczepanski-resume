import * as React from "react";
import { useState } from "react";
import Resume from "../components/Resume";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Flag from "react-world-flags";
import { motion, AnimatePresence } from "framer-motion"; 

const IndexPage = () => {
  const [language, setLanguage] = useState<"en" | "pl">("en");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "pl" ? "en" : "pl"));
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
          <Resume language={language} /> {/* Resume */}
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
          }}
          onClick={toggleLanguage}
        >
          {language === "pl" ? (
            <Flag code="USA" style={{ width: 24, height: 24 }} />
          ) : (
            <Flag code="POL" style={{ width: 24, height: 24 }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export const Head = () => {};

export default IndexPage;
