package bbb;

import java.util.Scanner;
import java.text.DecimalFormat;

class RTriangle implements IShape {
    private double a;
    private double b;

    public RTriangle(double a, double b) {
        this.a = a;
        this.b = b;
    }

    public double getArea() {
        return a * b / 2;
    }

    public double getPerimeter() {
        return Math.sqrt(a * a + b * b) + a + b;
    }
}
public class main {
    public static void main(String[] args) {
        DecimalFormat d = new DecimalFormat("#.####");
        Scanner input = new Scanner(System.in);
        double a = input.nextDouble();
        double b = input.nextDouble();
        IShape r = new RTriangle(a, b);
        System.out.println(d.format(r.getArea()));
        System.out.println(d.format(r.getPerimeter()));
        input.close();
    }
}
