package mars.rover.model;

import java.util.function.UnaryOperator;

public record Rover(Coordinates coordinates, Direction direction) {
    public static Rover executeRotation(Rover rover, UnaryOperator<Direction> changeDirectionFn) {
        return new Rover(rover.coordinates(), changeDirectionFn.apply(rover.direction()));
    }
}
