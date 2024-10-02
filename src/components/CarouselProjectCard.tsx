import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

interface CarouselProjectCardProps {
  image: IGatsbyImageData;
  title: string;
  description: string;
  link: string; 
}

const CarouselProjectCard: FC<CarouselProjectCardProps> = ({ image, title, description, link }) => {
  const CardContent: React.JSX.Element = (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        width: "100%",
        height: "400px", 
        cursor: link ? "pointer" : "default",
      }}
    >
      {/* Gatsby Image */}
      <GatsbyImage
        image={image}
        alt={title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Dark Fade */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "50%", 
          background: "linear-gradient(transparent, rgba(0, 0, 0, 0.8))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "20px",
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            marginBottom: "10px",
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: "#ddd",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      {CardContent}
    </a>
  ) : (
    CardContent
  );
};

export default CarouselProjectCard;
