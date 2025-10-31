
import {highscores} from "../Data/highscores.js";

//quick sort 
function sort(){
    highscores.sort((a, b) => b.score - a.score);
}

//adds to array
function addScore(username, score){
    highscores.push({ username, score});
    sort();
};

//if it should add or update the list
function add_update(username, score){
    const num = Number(score);
    let found = false;


    for (let i = 0; i < highscores.length; i++){
        if (highscores[i].username === username){
            found = true;
            if (num > highscores[i].score){
                highscores[i].score = num;
                break;
            };
        };
    };
    //eusing this instead of else also avoids duplicates
    if (!found){
        addScore(username, score = num);
    };
    sort();
    return highscores.slice();

    /* originally tried for loop found this avoids duplicates but went back to for loop
    const trim_user = username.trim();
    const score_exist = highscores.find(h => h.username === trim_user);
    if(score_exist){
        if(num > score_exist.score){
            score_exist.score = num;
        }

    }else{
            highscores.push({username: trim_user, score: num});
        };
    sort();
    return highscores.slice(); */


    
};

//returning top highscore
function top_score() {
    if (highscores.length === 0){
        return null;
    };
    sort();
    return highscores[0];
}

//returning all highscores
function all_score(){
    sort();
    return highscores.slice();
};


//----------------------------------------------express controllers, ^above is previously used code---------------------------------------------------
//express updating and creating
const saveScore = ({username, score})=>{
    if(username && username.trim() != ''){
        return add_update(username, score);
    }
};

//express to delete
const removeScore = (username) => {
    let removed = null;
    //looping over array
    for(let i = 0; i < highscores.length; i++){
        //finding if username exists
        if(highscores[i].username == username){
            removed = highscores[i]
            highscores.splice(i,1);
            break;
        }
    }
    return removed;
}

export default {all_score, top_score, add_update, addScore, saveScore, removeScore};
