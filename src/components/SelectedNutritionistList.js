import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setSelectedNutritionistList } from '../redux/actions/productActions';
import { Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const SelectedNutritionistList = (props) => {
    const { setSelectedNutritionistList, selectedNutritionistList } = props;
    const [isLoading, setIsLoading] = useState(true);


    const fetchSelectedNutritionistList = async () => {
        try {
            const resp = await axios.get('http://localhost:3001/nutritionistList');
            setSelectedNutritionistList(resp.data);
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchSelectedNutritionistList();
    }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color='secondary' />
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
                    Selected Nutritionist List
                </Typography>
            </Card>
            {selectedNutritionistList && selectedNutritionistList.map((nutritionist) => (
                nutritionist.nutritionist.map((nutritionistSelected) =>
                    <div style={{ color: '#9c27b0' }}>
                        <Card variant="outlined" style={{ marginBottom: '20px', marginTop: '20px' }}>
                            <CardContent>
                                <Typography color="secondary" style={{ fontSize: 'xx-large', marginTop: '10px' }}>
                                    {nutritionistSelected.name} {nutritionistSelected.surname}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    Age: {nutritionistSelected.age}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    University: {nutritionistSelected.uni}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    Experience: {nutritionistSelected.experience}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    Profession: {nutritionistSelected.profession}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    Explanation: {nutritionistSelected.explanation}
                                </Typography>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        marginTop: '10px',
                                    }}
                                >
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: '10px',
                                    }}
                                >
                                    <WhatsAppIcon
                                        onClick={() => openWhatsAppChat('05369777282')}
                                        style={{ fontSize: '40px', color: 'white', backgroundColor: '#26e726', borderRadius: '50%', padding: '5px' }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )

            ))}
        </div>
    );

};

const mapStateToProps = (state) => ({
    selectedNutritionistList: state.selectedNutritionistList.selectedNutritionistList
});

const mapDispatchToProps = {
    setSelectedNutritionistList
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedNutritionistList);
