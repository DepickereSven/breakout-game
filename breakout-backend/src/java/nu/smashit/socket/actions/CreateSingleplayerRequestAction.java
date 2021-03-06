package nu.smashit.socket.actions;

import nu.smashit.core.Game;
import nu.smashit.core.GameManager;
import nu.smashit.socket.Client;

public class CreateSingleplayerRequestAction implements RequestAction {

    public int level;
    
    @Override
    public void handler(Client c) {
        GameManager gameSessionManager = GameManager.getInstance();
        try {
            Game gm = gameSessionManager.createSingleplayerGame(c.getUser(), level);
            gm.startGame();
        } catch (Error err) {
            c.sendAction(new CreateGameFailureAction(err.getMessage()));
        }
    }
}
