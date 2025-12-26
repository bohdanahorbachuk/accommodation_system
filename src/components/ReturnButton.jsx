import { Button } from '@mui/material';

const ReturnButton = ({ onClick }) => {

  return (
    <Button
      variant="outlined"
      onClick={onClick} 
      sx={{
          mt: 2,
          borderColor: '#001f3f',
          color: '#001f3f',
          '&:hover': {
              borderColor: '#003366',
              bgcolor: 'rgba(0, 31, 63, 0.04)'
          },
          fontWeight: 'bold',
          py: 1,
          borderRadius: '8px',
          textTransform: 'none',
          width: '100%'
      }}
    >
      Повернутися до списку заявок
      </Button>
  )
};

export default ReturnButton;