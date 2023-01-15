package mars.rover.model;

public record Result(boolean hasHitObstacle, Rover rover) {

    public String toString() {
        return (this.hasHitObstacle() ?"O:": "") +
                this.rover().coordinates().x() + ":" + this.rover().coordinates().y() + ":" + this.rover().direction().toString();
    }
}
