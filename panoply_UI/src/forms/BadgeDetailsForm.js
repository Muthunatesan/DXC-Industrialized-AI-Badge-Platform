import React, { useState, Text, useEffect } from 'react';
import getRegistrationResponse from '../API/RegistrationAPI';
import LoginForm from './LoginForm';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import getViewBadgeByNameResponse from '../API/BadgeDetailsByNameAPI'
import formatDate from '../scripts/functions';
import CardMembershipOutlinedIcon from '@material-ui/icons/CardMembershipOutlined';
import ViewBadgeForm from '../forms/ViewBadgeForm';
import updateBadgeResponseAPI from '../API/UpdateBadgeAPI'
import { InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const BadgeDetailsForm = (props) => {

  const [badgeName, setbadgeName] = useState(props.badgeName);
  const [userType, setUserType]=useState(props.userType);
  const [badgeDescriptoion, setBadgeDescription] = useState('');
  const [createdDate, SetCreatedDate] = useState('');
  const [modifiedDate, SetModifiedDate] = useState('');
  const [link, setLink] = useState('');
  const [badgeType, setBadgeType] = useState('');
  const [evidenceRequired, setEvidenceRequired] = useState('');
  const [userRequestable, setUserRequestable] = useState('');
  const [owners, setOwners] = useState('');
  const [reviewers, setReviewers] = useState('');
  const [saveFlag, setSaveFlag]=useState('False')
  const [result, setResult]=useState('')
  const [backbuttonClicked, setBackButtonClicked]=useState('False');


  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


  const classes = useStyles();

  const handleBadgeNameChange =event =>{
    setbadgeName(event.target.value);
    setSaveFlag('True');
  }

  const handleBadgeDescriptionChange =event =>{
    setBadgeDescription(event.target.value);
    setSaveFlag('True');
  }
  const handleBadgeLinkChange =event =>{
    setLink(event.target.value);
    setSaveFlag('True');
  }
  const handleBadgeTypeChange =event =>{
    setBadgeType(event.target.value);
    setSaveFlag('True');
  }
  const handleEvidenceRequiredChange =event =>{
    setEvidenceRequired(event.target.value);
    setSaveFlag('True');
  }
  const handleUserRequestableChange =event =>{
    setUserRequestable(event.target.value);
    setSaveFlag('True');
  }
  const handleOwnerChange =event =>{
    setOwners(event.target.value);
    setSaveFlag('True');
  }
  const handleReviewerChange =event =>{
    setReviewers(event.target.value);
    setSaveFlag('True');
  }

  const handleSaveButtonClick = () =>{
    var response2 = new Promise((resolve, reject) => {
      resolve(updateBadgeResponseAPI(badgeName, badgeDescriptoion, link, userRequestable, badgeType, owners, reviewers, 'icon link',evidenceRequired));
    }).then(value=>{
      if (value==200){
        setResult('Saved Successfully');
        setSaveFlag('False');
      }
    });
  }

  const handleBackButtonClick = () =>{
    setBackButtonClicked('True');
  }

  const handleviewBadgeByName = async () => {

    var response1 = new Promise((resolve, reject) => {
      resolve(getViewBadgeByNameResponse(badgeName));
    }).then(value => {
      if (value != undefined) {
        setBadgeDescription(value[0].description);
        setLink(value[0].link);
        setUserRequestable(value[0].userRequestable);
        setEvidenceRequired(value[0].evidence);
        setOwners(value[0].owner_details[0].email);
        setReviewers(value[0].reviewer_details[0].email);
        setBadgeType(value[0].badge_type_details[0].badgeType);
        SetCreatedDate(formatDate(value[0].created.$date));
        SetModifiedDate(formatDate(value[0].modified.$date));

        // setresponse(value.length);
        // console.log(response);

      }


    });

  }

  useEffect(() => {
    handleviewBadgeByName()
  }, []);

  
if (backbuttonClicked=='True'){
return (
  <div><ViewBadgeForm userType={userType} /> </div>
);
}
else{
if(userType=='5f760d4325c1036d4d466560'){
return (
<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CardMembershipOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Badge Details
      </Typography>
        <br></br>
        {/* <form className={classes.form} noValidate> */}
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              name="badgeName"
              variant="outlined"
              fullWidth
              id="badgeName"
              label="Badge Name"
              inputProps={{
                "data-testid": "badgeDetails_badgeName",
              }}
              value={badgeName}
              onChange={handleBadgeNameChange}
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              variant="outlined"
              fullWidth
              multiline
              id="badgeDescriptoion"
              label="Badge Description"
              name="badgeDescriptoion"
              inputProps={{
                "data-testid": "badgeDetails_badgeDescription",
              }}
              value={badgeDescriptoion}
              onChange={handleBadgeDescriptionChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="createdDate"
              label="Created Date"
              name="createdDate"
              inputProps={{
                "data-testid": "badgedetails_createdDate",
              }}
              value={createdDate}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="modifiedDate"
              label="modified Date"
              name="modifiedDate"
              inputProps={{
                "data-testid": "badgeDetails_modifiedDate",
              }}
              value={modifiedDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="link"
              label="Link"
              id="link"
              inputProps={{
                "data-testid": "badgeDetails_link",
              }}
              value={link}
              onChange={handleBadgeLinkChange}
            />
          </Grid>
          <Grid item xs={12}>
          <InputLabel shrink id="badgeDetails_badgeType">
                        Badge Type
                    </InputLabel>
                        <Select
                        variant ="outlined"
                            labelId="badgeDetails_badgeType"
                            id="badgeDetails_badgeType"
                            name="Badge Status"
                            fullWidth
                            label="Badge Type"
                            inputProps={{
                                "data-testid": "badgeDetails_badgeType",
                            }}
                            value={badgeType}
                            onChange={handleBadgeTypeChange}
                            >
                            <MenuItem value={'Open Badge'}>Open Badge</MenuItem>
                            <MenuItem value={'Community Badge'}>Community Badge</MenuItem>
                        </Select>
            {/* <TextField
              variant="outlined"
              fullWidth
              name="badgeType"
              label="Badge Type"
              id="badgeType"
              inputProps={{
                "data-testid": "badgeDetails_badgeType",
              }}
              value={badgeType}
              onChange={handleBadgeTypeChange}
            /> */}
          </Grid>

          <Grid item xs={12}>
          <InputLabel shrink id="badgeDetails_evidenceRequired">
                        Evidence Required
                    </InputLabel>
                        <Select
                        variant ="outlined"
                            labelId="badgeDetails_evidenceRequired"
                            id="badgeDetails_evidenceRequired"
                            name="badgeDetails_evidenceRequired"
                            fullWidth
                            label="Evidence Required"
                            inputProps={{
                                "data-testid": "badgeDetails_evidenceRequired",
                            }}
                            value={evidenceRequired}
                            onChange={handleEvidenceRequiredChange}
                            >
                            <MenuItem value={'True'}>True</MenuItem>
                            <MenuItem value={'False'}>False</MenuItem>
                        </Select>
            {/* <TextField
              variant="outlined"
              fullWidth
              name="evidenceRequired"
              label="Evidence Required"
              id="evidenceRequired"
              inputProps={{
                "data-testid": "badgeDetails_evidenceRequired",
              }}
              value={evidenceRequired}
              onChange={handleEvidenceRequiredChange}
            /> */}
          </Grid>
          <Grid item xs={12}>
          <InputLabel shrink id="badgeDetails_userRequestable">
                        User Requestable
                    </InputLabel>
                        <Select
                        variant ="outlined"
                            labelId="badgeDetails_userRequestable"
                            id="badgeDetails_userRequestable"
                            name="badgeDetails_userRequestable"
                            fullWidth
                            label="User Requestable"
                            inputProps={{
                                "data-testid": "badgeDetails_userRequestable",
                            }}
                            value={userRequestable}
                            onChange={handleUserRequestableChange}
                            >
                            <MenuItem value={'True'}>True</MenuItem>
                            <MenuItem value={'False'}>False</MenuItem>
                        </Select>
            {/* <TextField
              variant="outlined"
              fullWidth
              name="userRequestable"
              label="User Requestable"
              id="userRequestable"
              inputProps={{
                "data-testid": "badgeDetails_userRequestable",
              }}
              value={userRequestable}
              onChange={handleUserRequestableChange}
            /> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="owners"
              label="Owners of Badge"
              id="owners"
              inputProps={{
                "data-testid": "badgeDetails_owners",
              }}
              value={owners}
              onChange={handleOwnerChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              
              name="reviewers"
              label="Reviewers of Badge"
              id="reviewers"
              inputProps={{
                "data-testid": "badgeDetails_reviewers",
              }}
              value={reviewers}
              onChange={handleReviewerChange}
            />
          </Grid>

        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              disabled={saveFlag=='True'?false:true}
              variant="contained"
              color="primary"
              className={classes.submit}
              data-testid="badgeDetails_UpdateButton"
              onClick={handleSaveButtonClick} >
              
              Save
        </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            data-testid="badgeDetails_backButton" 
            onClick={handleBackButtonClick}>
            Back to Badges
        </Button>
          </Grid>
        </Grid>
        <label>{result}</label>
        <input type="text" hidden data-testid='badgeDetails_Result' value={result} />
      </div>
    </Container>
);
}
else{
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CardMembershipOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Badge Details
      </Typography>
        <br></br>
        {/* <form className={classes.form} noValidate> */}
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              name="badgeName"
              variant="outlined"
              fullWidth

              id="badgeName"
              label="Badge Name"
              inputProps={{
                "data-testid": "badgeDetails_badgeName",
              }}
              value={badgeName}
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              variant="outlined"
              fullWidth
              multiline
              id="badgeDescriptoion"
              label="Badge Description"
              name="badgeDescriptoion"
              inputProps={{
                "data-testid": "badgeDetails_badgeDescription",
              }}
              value={badgeDescriptoion}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="createdDate"
              label="Created Date"
              name="createdDate"
              inputProps={{
                "data-testid": "badgedetails_createdDate",
              }}
              value={createdDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="modifiedDate"
              label="modified Date"
              name="modifiedDate"
              inputProps={{
                "data-testid": "badgeDetails_modifiedDate",
              }}
              value={modifiedDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="link"
              label="Link"
              id="link"
              inputProps={{
                "data-testid": "badgeDetails_link",
              }}
              value={link}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="badgeType"
              label="Badge Type"
              id="badgeType"
              inputProps={{
                "data-testid": "badgeDetails_badgeType",
              }}
              value={badgeType}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="evidenceRequired"
              label="Evidence Required"
              id="evidenceRequired"
              inputProps={{
                "data-testid": "badgeDetails_evidenceRequired",
              }}
              value={evidenceRequired}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="userRequestable"
              label="User Requestable"
              id="userRequestable"
              inputProps={{
                "data-testid": "badgeDetails_userRequestable",
              }}
              value={userRequestable}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="owners"
              label="Owners of Badge"
              id="owners"
              inputProps={{
                "data-testid": "badgeDetails_owners",
              }}
              value={owners}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              
              name="reviewers"
              label="Reviewers of Badge"
              id="reviewers"
              inputProps={{
                "data-testid": "badgeDetails_reviewers",
              }}
              value={reviewers}
            />
          </Grid>

        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              data-testid="badgeDetails_requestButton" >
              Request Badge
        </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            data-testid="badgeDetails_backButton" >
            Back to Badges
        </Button> */}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
      }
    }
  //   }
  // }
};

export default BadgeDetailsForm;