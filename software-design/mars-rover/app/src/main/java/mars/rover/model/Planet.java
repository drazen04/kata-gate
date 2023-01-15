package mars.rover.model;

import java.util.List;

public record Planet(Grid grid, List<Obstacle> obstacles) {}
