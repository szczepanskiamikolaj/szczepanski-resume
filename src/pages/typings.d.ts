
import { CardProps } from '@mui/material/Card';
import { ComponentsProps, ComponentsVariants } from '@mui/material/styles';

declare module "*.module.css";

declare module '*.png';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    blackCard: true;
    whiteCard: true; 
  }
}


