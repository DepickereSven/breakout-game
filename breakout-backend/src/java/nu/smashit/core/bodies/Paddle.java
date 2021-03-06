package nu.smashit.core.bodies;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import nu.smashit.core.GameCanvas;

/**
 *
 * @author jodus
 */
@JsonIgnoreProperties(value = {"h"})
@JsonFormat(shape = JsonFormat.Shape.ARRAY)
public class Paddle extends MovableBody {

    public final static int MOVE_STEP_SIZE = 8;

    public final static int GAP = 6;

    public final static int HEIGHT = 14;
    public final static int WIDTH = 50;
    public final static int X_START_POS = (GameCanvas.WIDTH / 2) - (WIDTH / 2);

    public final static int PLAYER_1_Y = GameCanvas.HEIGHT - HEIGHT - GAP;
    public final static int PLAYER_2_Y = GAP;

    private double dx;

    public Paddle(int y) {
        super(X_START_POS, y, WIDTH, HEIGHT);
        dx = 0;
    }

    public boolean move() {
        if (dx == 0) {
            return false;
        }
        if (dx < 0 && getX() < GAP) {
            return false;
        }
        if (dx > 0 && getX() > GameCanvas.WIDTH - getWidth() - GAP) {
            return false;
        }
        super.move((int) dx, 0);
        return true;
    }

    public void goLeft() {
        dx -= MOVE_STEP_SIZE;
    }

    public void goRight() {
        dx += MOVE_STEP_SIZE;
    }

    public void goNowhere() {
        dx = 0;
    }

    @JsonIgnore
    public int getHash() {
        return (getX() + ":" + getHeight() + ":" + getWidth()).hashCode();
    }
    
    @Override
    public void setX(int x){
        super.setX(x);
    }

}
