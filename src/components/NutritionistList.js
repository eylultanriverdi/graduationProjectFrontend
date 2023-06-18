import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import { createNutritionistSelected, setNutritionistList } from '../redux/actions/productActions';
import { Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const NutritionistList = (props) => {
    const { setNutritionistList, nutritionistList, createNutritionistSelected } = props;
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const fetchNutritionistList = async () => {
        try {
            const resp = await axios.get('http://localhost:3001/nutritionists');
            setNutritionistList(resp.data);
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToList = async (nutritionistEmail) => {
        try {
            const selectedNutritionist = nutritionistList.find(
                (nutritionist) => nutritionist.email === nutritionistEmail
            );

            if (selectedNutritionist) {
                const {
                    uid,
                    name,
                    surname,
                    email,
                    tel,
                    password,
                    age,
                    uni,
                    experience,
                    profession,
                    explanation,
                } = selectedNutritionist;

                const resp = await axios.post(
                    `http://localhost:3001/addNutritionistList`,
                    {
                        nutritionistListId: '',
                        nutritionist: [
                            {
                                uid: uid,
                                name: name,
                                surname: surname,
                                email: email,
                                tel: tel,
                                password: password,
                                age: age,
                                uni: uni,
                                experience: experience,
                                profession: profession,
                                explanation: explanation,
                            },
                        ],
                    },
                    { timeout: 5000 }
                );

                createNutritionistSelected(resp.data);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchNutritionistList();
    }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="secondary" />
            </div>
        );
    }

    const openWhatsAppChat = (phoneNumber) => {
        const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        const whatsappURL = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}`;

        window.open(whatsappURL, '_blank', 'noopener noreferrer');
    };

    return (
        <div>
            <Card variant="outlined" style={{ marginBottom: '20px', marginTop: '20px' }}>
                <Typography color="secondary" style={{ marginLeft: '20px', fontSize: 'xx-large' }}>
                    Nutritionist List
                </Typography>
            </Card>
            {nutritionistList &&
                nutritionistList.map((nutritionist) => (
                    <div key={nutritionist.id} style={{ color: '#9c27b0' }}>
                        <Card variant="outlined" style={{ marginBottom: '20px', marginTop: '20px' }}>
                            <CardContent>
                                <Typography color="secondary" style={{ fontSize: 'xx-large', marginTop: '10px' }}>
                                    {nutritionist.name} {nutritionist.surname}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    Age: {nutritionist.age}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    University: {nutritionist.uni}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    Experience: {nutritionist.experience}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    Profession: {nutritionist.profession}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    Explanation: {nutritionist.explanation}
                                </Typography>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: '10px',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleAddToList(nutritionist.email)}
                                    >
                                        Add to My Dietitians List
                                    </Button>
                                    <WhatsAppIcon
                                        onClick={() => openWhatsAppChat('05369777282')}
                                        style={{ fontSize: '40px', color: 'white', backgroundColor: '#26e726', borderRadius: '50%', padding: '5px' }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
        </div>
    );
};

const mapStateToProps = (state) => ({
    nutritionistList: state.nutritionistList.nutritionistList,
});

const mapDispatchToProps = {
    setNutritionistList,
    createNutritionistSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(NutritionistList);
