package aaa;
import java.util.Scanner;
public class main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int shapeType = scanner.nextInt();

        Shape shape = null;

        if (shapeType == 1) { // 圆形
            float radius = scanner.nextFloat();
            shape = new Circle(radius);
        } else if (shapeType == 2) { // 矩形
            float length = scanner.nextFloat();
            float width = scanner.nextFloat();
            shape = new Rectangle(length, width);
        } else {
            System.out.println("Invalid shape type");
            return;
        }

        float area = shape.getArea();
        float perimeter = shape.getPerimeter();

        System.out.printf("%.2f %.2f\n", area, perimeter);
    }
}
