/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package mars.rover;

import mars.rover.model.*;
import mars.rover.util.IOUtil;
import mars.rover.util.Parser;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static mars.rover.util.Parser.parseCommands;
import static mars.rover.util.Parser.parseGrid;
import static mars.rover.util.RoverUtil.executeCommands;

public class App {

    public static final String FILE_MISSION_NAME = "input.txt";

    public static void main(String[] args) {

        Rover rover = new Rover(new Coordinates(0, 0), Direction.N);

        try {

            List<String> missionParts = IOUtil.getInputStreamAsListString(IOUtil.getFileFromResourceAsStream(FILE_MISSION_NAME));
            String inputGrid = parseGrid(missionParts);
            String inputCommands = parseCommands(missionParts);

            List<Obstacle> obstacles = Parser.parseObstacles(inputGrid);
            Size size = Parser.parseSize(inputGrid);
            List<String> commands = Arrays.stream(inputCommands.split("\n"))
                    .skip(1)
                    .toList();

            Planet planet = new Planet(new Grid(size), obstacles);
            List<Result> results = executeCommands(planet, rover, commands);

            printResult(results);

        } catch(Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public static void printResult(List<Result> results) {
        System.out.println(joinResultsToString(results, "\n"));
    }

    public static String joinResultsToString(List<Result> results, String delimiter) {
        return results.stream().map(Result::toString).collect(Collectors.joining(delimiter));
    }

}
