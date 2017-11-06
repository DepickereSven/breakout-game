/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nu.smashit.core;

/**
 *
 * @author jodus
 */
public class MovableBody extends Body {

    private final int ogX;
    private final int ogY;
    private final int ogWidth;
    private final int ogHeight;

    public MovableBody(int x, int y, int width, int height) {
        super(x, y, width, height);
        ogX = x;
        ogY = y;
        ogWidth = width;
        ogHeight = height;
    }

    public void reset() {
        this.x = ogX;
        this.y = ogY;
        this.width = ogWidth;
        this.height = ogHeight;
    }

    public void move(int dx, int dy) {
        this.x += dx;
        this.y += dy;
    }
}
