package mars.rover.model;

import java.util.HashMap;
import java.util.Map;

public record Coordinates(int x, int y) {
    private static Map<Direction, Coordinates> toCoordinates;
    static {
        Coordinates.toCoordinates = new HashMap<>();
        Coordinates.toCoordinates.put(Direction.N, new Coordinates(0, 1));
        Coordinates.toCoordinates.put(Direction.S, new Coordinates(0, -1));
        Coordinates.toCoordinates.put(Direction.E, new Coordinates(1, 0));
        Coordinates.toCoordinates.put(Direction.W, new Coordinates(-1, 0));
    }

    public static Coordinates coordinatesByDirection(Coordinates coordinates, Direction direction) {
        int actualX = coordinates.x();
        int actualY = coordinates.y();
        Coordinates value = offset(direction);
        return new Coordinates( actualX + value.x(), actualY + value.y());
    }

    public static Coordinates pacmanEffect(Planet planet, Coordinates coordinates) {
        int x = coordinates.x() < 0 ? planet.grid().size().width() -1 : coordinates.x() >= planet.grid().size().width() ? 0 : coordinates.x();
        int y = coordinates.y() < 0 ? planet.grid().size().height() -1 : coordinates.y() >= planet.grid().size().height() ? 0 : coordinates.y();
        return new Coordinates(x, y);
    }

    private static Coordinates offset(Direction direction) {
        return toCoordinates.get(direction);
    }
}
