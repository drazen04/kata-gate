package mars.rover.util;

import mars.rover.model.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.IntStream;

public class RoverUtil {

    public static Map<Direction, Direction> toOppositeDirection;
    static {
        toOppositeDirection = new HashMap<>();
        toOppositeDirection.put(Direction.N, Direction.S);
        toOppositeDirection.put(Direction.S, Direction.N);
        toOppositeDirection.put(Direction.E, Direction.W);
        toOppositeDirection.put(Direction.W, Direction.E);
    }

    public static <T> Movement toMovement(Function<T, Movement> fn, T fromValue)  {
        return fn.apply(fromValue);
    }

    public static Coordinates updatedCoordinates(Planet planet, Rover rover, Movement movement)  {
        switch (movement) {
            case B -> {
                return Coordinates.pacmanEffect(planet, Coordinates.coordinatesByDirection(rover.coordinates(), toOppositeDirection.get(rover.direction())));
            }
            case F -> {
                return Coordinates.pacmanEffect(planet, Coordinates.coordinatesByDirection(rover.coordinates(), rover.direction()));
            }
        }
        return rover.coordinates();
    }

    public static boolean checkIfHitsObstacle(Coordinates coordinates, List<Obstacle> obstacles) {
        return obstacles.stream()
                .map(Obstacle::coordinates)
                .anyMatch(obsCoordinates -> obsCoordinates.equals(coordinates));
    }

    public static List<Result> executeCommands(Planet planet, Rover rover, List<String> commands) {
        Result result = new Result(false, rover);
        List<Result> results = new ArrayList<>();

        for (String command : commands) {
            char[] commandCharacters = command.toCharArray();


            // NOTE: It is not possible create a CharStream by design.
            //       More info on https://mail.openjdk.org/pipermail/lambda-dev/2013-March/008535.html
            result = IntStream.range(0, commandCharacters.length)
                    .mapToObj(i -> RoverUtil.toMovement(Movement::fromChar, commandCharacters[i]))
                    // NOTE: This reduce implementation apply combinator only in parallel execution
                    .reduce(result, (acc, mov) -> moveRover(planet, acc.rover(), mov), (Result x, Result y) -> x);

            results.add(result);
        }
        return results;
    }

    public static Result moveRover(Planet planet, Rover rover, Movement movement) {
        switch (movement) {
            case F, B -> {
                return getUpdatedRoverPositionResult(planet, rover, movement);
            }
            case L -> {
                return new Result(false, Rover.executeRotation(rover, Rotate::left));
            }
            case R -> {
                return new Result(false, Rover.executeRotation(rover, Rotate::right));
            }
            default -> throw new IllegalStateException("Unknown movement: " + movement);
        }
    }

    public static Result getUpdatedRoverPositionResult(Planet planet, Rover rover, Movement movement) {
        Coordinates updatedCoordinates = updatedCoordinates(planet, rover, movement);
        boolean hasHitsObstacle = checkIfHitsObstacle(updatedCoordinates, planet.obstacles());
        return hasHitsObstacle ?
                new Result(true, rover)
                : new Result(false, new Rover(updatedCoordinates, rover.direction()));
    }

}
