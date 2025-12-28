import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import BackButton from '../components/BackButton';

const FaqPage = () => {

    const faqData = [
        {
            question: "Яку роль мені обрати при реєстрації?",
            answer: "Обирайте роль «Студент», якщо ви навчаєтесь у закладі. Обирайте роль «Гість», якщо ви відвідувач (наприклад, батьки студента, учасник конференції) і потребуєте тимчасового житла."
        },
        {
            question: "Як забронювати кімнату?",
            answer: "Увійдіть в особистий кабінет, натисніть кнопку «Подати заявку», вкажіть дати заселення/виселення та натисніть «Подати заявку»."
        },
        {
            question: "Чи означає подача заявки, що кімната вже заброньована?",
            answer: "Ні, це лише запит. Бронювання вважається дійсним тільки після того, як адміністратор змінить статус заявки на «Прийнято»."
        },
        {
            question: "Як я дізнаюся, що мою заявку схвалено?",
            answer: "Перевіряйте статус в особистому кабінеті. Нова — на розгляді. Прийнято — заброньовано. Відхилено — відмова."
        },
        {
            question: "Чому мою заявку було відхилено?",
            answer: "Адміністратор залишає коментар із причиною відмови. Ви можете побачити його поруч зі статусом заявки."
        },
        {
            question: "Яка вартість проживання в гуртожитку?",
            answer: "В гуртожитку №3 вартість проживання становить 130 гривень за одну добу, а вартість проживання у кімнатах поліпшеного типу 170 гривень за добу."
        }
    ];

    return (
        <Box sx={{ pb: 4 }}>
            
            <Typography variant="h3" sx={{ m: 5, textAlign: 'center' }}>
                Поширені запитання
            </Typography>

            <Box sx={{ maxWidth: '800px', mx: 'auto', px: 2, mb: 4 }}>
                {faqData.map((item, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {item.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {item.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            {/* <Box sx={{ 
                maxWidth: '400px',
                mx: 'auto', 
                width: '100%',
                display: 'flex',        // Центрування кнопки
                justifyContent: 'center'
            }}>
                <BackButton onClick={() => window.history.back()} />
            </Box> */}
        </Box>
    )
};

export default FaqPage;