import { Router } from 'express';
import controllers from '../Controllers/controllers.js';
//import { skip } from 'node:test';
import {highscores} from '../Data/highscores.js';
const router = Router();


//get all highscores and stuff with pagination
//this might not work so prepare to debug

router.get("/", (req, res) =>{
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || highscores.length;
    const scores = controllers.all_score();
    const paginated_scores = scores.slice(skip, skip + limit);
    
    console.log("Skip:", skip, "Limit:", limit);
    console.log("Returning:", paginated_scores);

    console.log(typeof req.query.skip, req.query.skip);
    res.json(paginated_scores);
});

//returning specific highscore
router.get("/username", (req, res) =>{
    const username = req.query.username;
    const scores = controllers.all_score()
    const single_score = scores.find(u => u.username === username);

    if (!single_score){
        return res.status(404).send("User not found");
    }
    //res.json({ username: single_score.username, score: single_score.score});
    res.json(single_score)
});

//post to create and update

router.post("/save", (req, res) =>{
     const highscore = {
        username: req.body.username,
        score: parseInt(req.body.score),
    };
    console.log("body: ", req.body.id);
    console.log(highscore);
    const saved = controllers.saveScore(highscore);
    if(saved){
        res.json(saved);
    }else{
        res.status(500).send(`Something went wrong when updating/creating a score`)
    }
});

//delete

router.delete("/delete", (req,res)=>{
    const username = req.query.username;
    const removed = controllers.removeScore(username);

    if(removed){
        res.json(removed);
    }else{
        res.status(400).send('That person might not exist')
    }

});
export default router;