package mars.rover.model;

import static mars.rover.model.Direction.*;
import static mars.rover.model.Direction.N;

public class Rotate {

    public static Direction left(Direction direction) {
        switch (direction) {
            case N -> {return W;}
            case S -> {return E;}
            case E -> {return N;}
            case W -> {return S;}
        }

        return null;
    }

    public static Direction right(Direction direction) {
        switch (direction) {
            case N -> {return E;}
            case S -> {return W;}
            case E -> {return S;}
            case W -> {return N;}
        }

        return null;
    }
}
