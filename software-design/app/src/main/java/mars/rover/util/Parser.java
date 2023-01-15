package mars.rover.util;

import mars.rover.model.Coordinates;
import mars.rover.model.Obstacle;
import mars.rover.model.Size;

import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class Parser {

    public static String parseGrid(List<String> input) {
        return input.stream()
                .takeWhile(string -> !string.equals("Commands"))
                .collect(Collectors.joining("\n"));
    }

    public static String parseCommands(List<String> input) {
        return input.stream()
                .dropWhile(string -> !string.equals("Commands"))
                .collect(Collectors.joining("\n"));
    }

    public static <T> List<T> fromInput(String input, Predicate<String> predicate, Function<String, T> fn) {
        return Arrays.stream(input.split("\n"))
                .skip(1)
                .filter(predicate)
                .map(fn)
                .toList();
    }

    public static Size sizeFromInput(String input) {
        return Arrays.stream(input.split("\n"))
                .skip(1)
                .filter( string -> string.contains("Size"))
                .map( Parser::getSizeFromInput)
                .toList().get(0);
    }

    public static Size parseSize(String input) {
        return fromInput(
                input,
                (in) -> in.contains("Size"),
                Parser::getSizeFromInput
        ).get(0);
    }

    public static List<Obstacle> parseObstacles(String input) {
        return fromInput(
                input,
                (in) -> in.contains("Obstacle"),
                Parser::getObstacleFromInput
        );
    }



    public static Size getSizeFromInput(String input) {
        return new Size(
                Integer.parseInt(input.split(" ")[1]),
                Integer.parseInt(input.split(" ")[2])
        );
    }

    public static Obstacle getObstacleFromInput(String input) {
        return new Obstacle(
                new Coordinates(
                        Integer.parseInt(input.split(" ")[1]),
                        Integer.parseInt(input.split(" ")[2]))
        );
    }
}
