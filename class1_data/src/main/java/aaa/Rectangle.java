package aaa;

class Rectangle implements Shape {
    private float length;
    private float width;

    public Rectangle(float length, float width) {
        this.length = length;
        this.width = width;
    }

    @Override
    public float getArea() {
        return length * width;
    }

    @Override
    public float getPerimeter() {
        return 2 * (length + width);
    }
}