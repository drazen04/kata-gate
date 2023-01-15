package mars.rover.model;

public enum Movement {
    L, // Left
    R, // Right
    F, // Forward
    B;  // Backward;


    public static Movement fromChar(char charValue) {
        switch (Character.toUpperCase(charValue)) {
            case 'L' -> {
                return L;
            }
            case 'R' -> {
                return R;
            }
            case 'F' -> {
                return F;
            }
            case 'B' -> {
                return B;
            }
            default -> throw new IllegalStateException("Unknown movement " + charValue);
        }
    }
}
