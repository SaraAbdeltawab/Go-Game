from dlgo.agent import naive
from dlgo import goboard_slow as goboard
from dlgo import gotypes
from dlgo.utils import print_board, print_move
import time
from  MCTS import monte_carlo_tree_search
import time

def main():
    board_size = 19
    game = goboard.GameState.new_game(board_size) 
    captures = {
        gotypes.Player.black: 0,
        gotypes.Player.white: 0,
    } 
    while not game.is_over():

        print_board(game.board)
        
        player = game.next_player
        
        num_rounds = 10
        
        depth =10
        

        start = time.time()

        game , captures = monte_carlo_tree_search( game,player,num_rounds,captures,depth)
        end = time.time()
        print(end - start)

    winner,score = game.winner(captures)

    if winner == gotypes.Player.black:
        print("Black is the WINNER!!!!")
    else:
        print("White is the WINNER!!!!")

    print('Black:', score[gotypes.Player.black] ,'\tWhite:', score[gotypes.Player.white])

if __name__ == '__main__':
    main()