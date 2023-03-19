// Core
import React, { useEffect, useCallback, useState, Fragment} from 'react'
import {
    Box,
    Card,
    Grid,
    Icon,
    IconButton,
    styled,
    Tooltip,
    Typography,
    Button
  } from "@mui/material";
import Paper from '@mui/material/Paper';
import axios from "./axios";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const StyledCard = styled(Card)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px !important",
    background: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: { padding: "16px !important" },
  }));
  
  const ContentBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    "& small": { color: theme.palette.text.secondary },
    "& .icon": {
      opacity: 0.6,
      fontSize: "44px",
      color: theme.palette.primary.main,
    },
    "& .text": { opacity: 0.6, color: theme.palette.primary.text },
  }));
  
  const Heading = styled("h6")(({ theme }) => ({
    margin: 0,
    marginTop: "4px",
    fontSize: "14px",
    fontWeight: "500",
    color: theme.palette.primary.main,
  }));

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));

const Main = () => {
    const [university, setUniversity] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [offerUrl, setOfferUrl] = useState('');
    const [itemData, setItemData] = useState([]);
    
    const getAllUniversisty = useCallback(async () => {        
        await axios.get("/user/applications")
        .then(function (response) {
            const res = response.data;           
            if(res.length > 0){
                setUniversity(res[0].university);
                setLoanAmount(res[0].loan_amount);
                setOfferUrl(res[0].offers_url);                
            }
          
        })
        .catch((error) => {
          
        });
      }, []);
      

      const showOffer = useCallback(async () => {        
        const offerURL = offerUrl.split( 'v1' );               
        await axios.get(offerURL[1])
        .then(function (response) {
            const res = response.data;           
            if(res.length > 0){
                setItemData(res);                          
            }
          
        })
        .catch((error) => {
          
        });
      }, [offerUrl]);
       
    
 
    useEffect(  () => {             
        getAllUniversisty();       
    }, [getAllUniversisty]);
  

  return (
    <Fragment>

    <Box component="main" sx={{ p: 3 }}>       
        <Typography variant="h5" gutterBottom>
          {university}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Loan Amount: {loanAmount}
        </Typography>
        <Button variant="contained" onClick={() => showOffer()} >Show Offer</Button>
        {itemData.length > 0 ? 
        <ImageList sx={{ width: 500, height: 450 }}>
            {itemData.map((item) => (
                <ImageListItem key={item.bank}>
                <img
                    src={`${item.bank_logo}?w=10&fit=crop&auto=format`}
                    srcSet={`${item.bank_logo}?w=10&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.bank}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={item.bank}
                    subtitle={<span>Interest Rate: {item.interest_rate} Tenure: {item.tenure}</span>}
                    position="below"
                />
                
                </ImageListItem>
            ))}
            </ImageList>
        :<></>}
      </Box>
    </Fragment>
    
  );
};

export default Main;
