var zmq = require("zeromq");
var to_game = zmq.socket("push");
var fs = require('fs');
to_game.bindSync("tcp://127.0.0.1:3000");



//console.log("GUI interface started!");
var oppo_mode = 0;

// white : 1 , black : 0
function send_opponent_color(color){
   // console.log("interface: color: ", color)
    to_game.send(color);
}

function send_opponent_move(move_type, position){
    if(move_type!=0){
        pos= "0-0";
    }
    else
        pos = position[0]+'-'+position[1]
    to_game.send(move_type+"#"+pos);
}


// to start, we should know our opponent to decide on the methods used later.
function send_mode(mode){
    to_game.send(mode);
    oppo_mode = mode; 
}

function send_initial_board(board){
    //console.log("send_initial_board ", board);
    //converting the board to a string.
    var l1 = board.length;
    var board_str = "";
    var msg = ""; //  indicator message .
    if(l1 == 0)
        msg ="-1";  
    else
    {
        msg = "1";
        var l2 = board[0].length;
        for(i = 0 ; i<l1 ;i++)
        {
            board_str += (board[i][0]+"-"+board[i][1]+"-"+board[i][2]+"\n");

        }
         fs.writeFile("../Game/initial_state.txt",board_str,(err)=>{
        if(err) console.log(err);
		//else console.log("successfully written into file.");
    });
      //console.log(board_str);
    }
    to_game.send(msg);
}

module.exports = {send_mode, send_opponent_color, send_opponent_move, send_initial_board};

// var board = [[1,2,3],[3,4,5]];
// send_initial_board(board);