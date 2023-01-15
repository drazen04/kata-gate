/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package mars.rover;

import mars.rover.model.*;
import mars.rover.util.RoverUtil;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class AppTest {
    @Test
    void test_backward() {

        Planet planet = new Planet(new Grid(new Size(5, 4)), new ArrayList<>());
        Coordinates initialCoordinates = new Coordinates(0, 0);
        Direction initialDirection = Direction.N;
        Rover rover = new Rover(initialCoordinates, initialDirection);

        List<String> commands = List.of("FF", "BB");

        String result = App.joinResultsToString(RoverUtil.executeCommands(planet, rover, commands), "\n");

        String guess = String.join("\n", List.of("0:2:N", "0:0:N"));

        assertEquals(guess, result);

    }

    @Test
    void test_unknown_command() {

        Planet planet = new Planet(new Grid(new Size(5, 4)), new ArrayList<>());
        Coordinates initialCoordinates = new Coordinates(0, 0);
        Direction initialDirection = Direction.N;
        Rover rover = new Rover(initialCoordinates, initialDirection);

        List<String> commands = List.of("FFX");

        IllegalStateException ex = assertThrows(
                IllegalStateException.class,
                ()-> App.joinResultsToString(RoverUtil.executeCommands(planet, rover, commands), "\n")
        );

        assertEquals(ex.getMessage(), "Unknown movement X");
    }
    @Test
    void test_with_obstacle() {

        List<Obstacle> obstacles = List.of(new Obstacle(new Coordinates(0, 3)));
        Planet planet = new Planet(new Grid(new Size(5, 4)), obstacles);
        Coordinates initialCoordinates = new Coordinates(0, 0);
        Direction initialDirection = Direction.N;
        Rover rover = new Rover(initialCoordinates, initialDirection);

        List<String> commands = List.of("LLF");

        String result = App.joinResultsToString(RoverUtil.executeCommands(planet, rover, commands), "\n");

        String guess = String.join("\n", List.of("O:0:0:S"));

        assertEquals(guess, result);
    }

    @Test
    void test_hit_all_obstacles() {

        List<Obstacle> obstacles = List.of(
                new Obstacle(new Coordinates(0, 3)),
                new Obstacle(new Coordinates(2, 0)),
                new Obstacle(new Coordinates(3, 2))
        );

        Planet planet = new Planet(new Grid(new Size(5, 4)), obstacles);
        Coordinates initialCoordinates = new Coordinates(0, 0);
        Direction initialDirection = Direction.N;
        Rover rover = new Rover(initialCoordinates, initialDirection);

        List<String> commands = List.of(
                "RFF",
                "LFFRFF",
                "LBB"
        );

        String result = App.joinResultsToString(RoverUtil.executeCommands(planet, rover, commands), "\n");

        String guess = String.join("\n",
                List.of(
                        "O:1:0:E",
                        "O:2:2:E",
                        "O:2:1:N"
                )
        );

        assertEquals(guess, result);
    }
}