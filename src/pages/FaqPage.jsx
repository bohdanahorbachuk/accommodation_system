import { Typography, Box } from '@mui/material';
import ReturnButton from '../components/ReturnButton';

const FaqPage = () => {

    return (
        <>
            <Typography variant="h3" sx={{ m: 5, textAlign: 'center' }}>Поширені запитання</Typography>
      
            <Box sx={{ 
                maxWidth: '400px',
                mx: 'auto', 
                width: '100%'
            }}>
                <ReturnButton onClick={() => window.history.back()} />
            </Box>
        </>
  )
};

export default FaqPage;