import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiPaper: {
            variants: [
                {
                    props: { variant: 'whiteCard' }, 
                    style: {
                        borderRadius: '12px',           
                        boxShadow: '0px 3px 6px rgba(0,0,0,0.4)',
                        padding: '16px',
                        marginBottom: '16px',         
                    },
                },
                {
                    props: { variant: 'blackCard' }, 
                    style: {
                        backgroundColor: '#545454', 
                        color: 'white', 
                        padding: '16px',
                        marginBottom: '16px',
                    },
                },
            ],
        },
        MuiCard: {
            variants: [
                {
                    props: { variant: 'whiteCard' }, 
                    style: {   
                    },
                },
                {
                    props: { variant: 'blackCard' }, 
                    style: {   
                    },
                },
            ],
        },
        MuiListItemText: {
            styleOverrides: {
                secondary: {
                    color: '#bbbbbb', 
                    fontSize: '10pt',
                },
            },
        },
    },
    typography: {
        fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    },
});

export default theme;
