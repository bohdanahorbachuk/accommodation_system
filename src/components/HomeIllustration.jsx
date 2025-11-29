import { Box } from '@mui/material';

const HomeIllustration = () => {
  const blueColor = '#001f3f'; // Темно-синій, як у логотипі
  const lightBlueColor = '#3f51b5'; // Світліший синій для вікон/деталей
  const yellowColor = '#ffc107'; // Жовтий для герба/деталей

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        height: 450, // Висота трохи менше для пропорцій
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end', // Вирівнюємо донизу для будинку
        position: 'relative',
        overflow: 'hidden', // Обрізаємо виступаючі частини
        pb: 2, // Невеликий відступ знизу
      }}
    >
      {/* Земля/Газон */}
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: 30, 
          bgcolor: '#a2d2ff', // Легкий блакитно-зелений для імітації землі
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0', // Овальна форма для землі
          zIndex: 0,
        }} 
      />

      {/* Будівля гуртожитку */}
      <Box
        sx={{
          width: 300,
          height: 350,
          bgcolor: blueColor,
          borderRadius: '8px 8px 0 0',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          border: `2px solid ${blueColor}`,
        }}
      >
        {/* Вікна */}
        {[...Array(9)].map((_, i) => ( // 3 поверхи по 3 вікна
          <Box
            key={`window-left-${i}`}
            sx={{
              position: 'absolute',
              width: 40,
              height: 40,
              bgcolor: lightBlueColor,
              borderRadius: '4px',
              left: (i % 3) * 60 + 20, // Розташування вікон
              top: Math.floor(i / 3) * 70 + 30,
            }}
          />
        ))}

        {/* Вхід */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 80,
            height: 80,
            bgcolor: lightBlueColor,
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            border: `2px solid ${blueColor}`,
            borderBottom: 'none',
          }}
        />

        {/* Герб/Лого на будинку */}
        <Box
          sx={{
            position: 'absolute',
            top: 100,
            right: 20,
            width: 50,
            height: 50,
            bgcolor: yellowColor,
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: blueColor,
            fontWeight: 'bold',
            fontSize: 24,
            '&::before': {
              content: '""',
              position: 'absolute',
              width: '60%',
              height: '60%',
              border: `2px solid ${blueColor}`,
              borderRadius: '4px',
            }
          }}
        >
          Ш
        </Box>
      </Box>

      {/* Лупа */}
      <Box
        sx={{
          position: 'absolute',
          top: 30, // Розташування лупи
          right: 20,
          width: 180,
          height: 180,
          borderRadius: '50%',
          border: `10px solid ${blueColor}`, // Обід лупи
          bgcolor: 'rgba(255,255,255,0.8)', // Прозорий фон
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 2,
        }}
      >
        {/* Іконка ліжка всередині лупи */}
        <Box
          sx={{
            width: 80,
            height: 80,
            bgcolor: lightBlueColor, // Світліший синій для іконки
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            '&::before': { // Ліжко
              content: '""',
              position: 'absolute',
              width: '60%',
              height: '40%',
              border: `4px solid ${blueColor}`,
              borderRight: 'none',
              borderBottom: 'none',
              borderTopLeftRadius: '8px',
              left: '20%',
              top: '30%',
            },
             '&::after': { // Подушка
              content: '""',
              position: 'absolute',
              width: '20%',
              height: '20%',
              bgcolor: blueColor,
              borderRadius: '4px',
              left: '15%',
              top: '20%',
            }
          }}
        />
        {/* Іконка піна всередині лупи */}
        <Box
          sx={{
            position: 'absolute',
            top: 25,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 25,
            height: 25,
            bgcolor: blueColor,
            borderRadius: '50% 50% 50% 0', // Форма краплі
            transform: 'translateX(-50%) rotate(-45deg)',
            zIndex: 3,
            '&::before': { // Кружечок всередині
              content: '""',
              position: 'absolute',
              width: '60%',
              height: '60%',
              bgcolor: 'white',
              borderRadius: '50%',
              top: '20%',
              left: '20%',
            }
          }}
        />
      </Box>

      {/* Ручка лупи */}
      <Box
        sx={{
          position: 'absolute',
          top: 170, // Положення ручки
          right: 0,
          width: 80,
          height: 20,
          bgcolor: blueColor,
          borderRadius: '0 10px 10px 0',
          transform: 'rotate(15deg)', // Невеликий нахил
          transformOrigin: 'left center',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default HomeIllustration;