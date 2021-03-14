import React, { useState,useContext } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';


const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 900,
      margin: theme.spacing(2),
      width: '100%'
    },
    media: {
      height: 190,
    },
  }));


export const ReviewItems = ({itemDetails,postContent,userPostLoading,sendPost}) =>
{
    const { User } = useContext(UserContext);
    const classes = useStyles();
    const [editPost,setEditPost] = useState({status : false,defaultValue : "Write your product review here"})


    const UserPostLoading = () =>
    {
        if(userPostLoading)
        {
            return <CircularProgress/>
        }
        else
        {
            if(editPost.status)
            {
                return <div>
                    <Button variant='contained' color='primary' onClick={() => {let rr = sendPost("editPost",editPost._id); console.log("RETURN:::" ,rr ); setEditPost({status : !editPost.status,defaultValue : "Write your product review here"})}}>
                        Repost
                    </Button>
                    <Button variant='contained' color='secondary' onClick={() => setEditPost({status : false,defaultValue : "Write your product review here"})}>
                        Cancel
                    </Button>
                    </div>
            }
            return <Button style={{marginTop : '0.8rem'}} variant='contained' color='primary' onClick={() => sendPost("addPost")}>
                    POST
                    </Button>
            
        }
    }


    const UserWritePostComp = () =>
    {
        return <form ref={postContent}><TextField
        ref={postContent}
        label="Write a review"
        name="PostContent"
        multiline
        rows={3}
        fullWidth={true}
        defaultValue={editPost.defaultValue}
        variant="outlined"
      />
        <UserPostLoading/>
      </form>
      
    }
    const editPostById = (postId,postContent) =>
    {
        setEditPost({status : !editPost.status,defaultValue : postContent,_id : postId})
        console.log("postid :  " , postId)
    }

    return <>
    <Grid container spacing={2} xl={12} md={12} sm={12} xs={12} >
    <Grid item xl={2} md={2} sm={2} xs={2} ></Grid>
    <Grid item xl={7} md={7} sm={7} xs={7}>
    <h2 id="UserPost">Customer Review</h2>
        <UserWritePostComp/>
        {itemDetails.postsProduct.length == 0 && <h3>Empty</h3>}
        {itemDetails.postsProduct.map((eachPost,index) => 
        <Grid container spacing={1}>
            <Card className={classes.card} key={index}>
                <Grid item item xl={12} md={12} sm={12} xs={12}>
                    <CardHeader title={eachPost.author} subheader={eachPost.date} action={editPost.status ? null : eachPost.author == User.email ? <Link onClick={() => editPostById(eachPost._id,eachPost.content)}>Edit<EditIcon/></Link> : null}/>
                </Grid>
                <CardContent>
                    <Typography variant="subtitle1"  color="textSecondary" component="p" gutterBottom>
                        {eachPost.content}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>)}
    </Grid>
    <Grid xl={6} md={6} sm={6} xs={6}></Grid>
    </Grid>
    </>
}