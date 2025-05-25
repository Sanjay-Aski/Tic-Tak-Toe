# Tic-Tak-Toe
This is my first HTML CSS and JAVASCRIPT project <br> Author - Sanjay </br>

## Features
*   Play Tic-Tac-Toe against another player (Dual Player mode).
*   Play Tic-Tac-Toe against an AI (Single Player mode).
*   User can choose to play as 'X' (first move) or 'O' (second move) against the AI.
*   Simple and clean user interface.

## Technologies Used
*   HTML
*   CSS
*   JavaScript

## AI Implementation: Minimax Algorithm

The single-player mode features an AI opponent that uses the Minimax algorithm to determine its moves. Minimax is a recursive decision-making algorithm commonly used in two-player turn-based games.

### How Minimax is Used Here:

1.  **Goal**: The AI's goal is to choose the move that maximizes its chances of winning or, at worst, leads to a draw. It assumes the human player will also play optimally to maximize their chances.

2.  **Recursive Function (`minimax(currentBoard, depth, isMaximizing)`)**:
    *   `currentBoard`: The current state of the game board.
    *   `depth`: The current depth in the game tree. This is used to prefer shorter paths to a win.
    *   `isMaximizing`: A boolean flag indicating if the current turn is for the maximizing player (AI) or the minimizing player (Human).

3.  **Base Cases (Terminal States)**:
    *   If the AI (`aiPlayer`) wins on the `currentBoard`, the function returns a positive score (e.g., `10 - depth`). A higher score is better for the AI. Subtracting depth encourages faster wins.
    *   If the Human (`humanPlayer`) wins on the `currentBoard`, the function returns a negative score (e.g., `-10 + depth`). A lower score is worse for the AI (better for the Human). Adding depth encourages delaying losses.
    *   If the game is a draw (no empty cells left and no winner), the function returns `0`.

4.  **Recursive Step**:
    *   **If `isMaximizing` (AI's turn)**:
        *   The AI iterates through all empty cells on the board.
        *   For each empty cell, it simulates placing its mark (`aiPlayer`) there.
        *   It then recursively calls `minimax` for the new board state, with `isMaximizing` set to `false` (as it's now the Human's turn to minimize the AI's score) and `depth` incremented.
        *   The AI chooses the move that leads to the maximum score returned by these recursive calls.
    *   **If `!isMaximizing` (Human's turn)**:
        *   The algorithm simulates the Human player's turn.
        *   It iterates through all empty cells, simulates placing the Human's mark (`humanPlayer`).
        *   It recursively calls `minimax` for the new board state, with `isMaximizing` set to `true` (as it's now the AI's turn to maximize its score) and `depth` incremented.
        *   It assumes the Human will choose the move that leads to the minimum score (most beneficial for the Human).

5.  **AI Move Selection (`aiMove()` function)**:
    *   The `aiMove` function iterates through all possible moves for the AI.
    *   For each possible move, it calls the `minimax` function (starting with `isMaximizing = false` because after the AI makes a move, it will be the human's turn to minimize).
    *   The AI then selects the move that results in the highest score returned by `minimax`.

This implementation allows the AI to "look ahead" at possible game outcomes and choose the path that is most advantageous for it, making it a challenging opponent.
