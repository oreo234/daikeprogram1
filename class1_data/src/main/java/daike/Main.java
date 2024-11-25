package daike;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int[] grade = new int[5];
        for (int i = 0; i < grade.length; i++) {
            grade[i] = in.nextInt();
        }

        RT rt = new RT(grade);
        double dd = rt.mark();
        System.out.printf("%.2f", dd);
    }
}

abstract class RR {
    int[] grade;

    public RR(int[] grade) {
        this.grade = grade;
    }

    public abstract double mark();
}

class RT extends RR {
    public RT(int[] grade) {
        super(grade);
    }

    @Override
    public double mark() {
        // 找到最高分和最低分
        int max = Integer.MIN_VALUE;
        int min = Integer.MAX_VALUE;
        int sum = 0;

        for (int g : grade) {
            sum += g;
            if (g > max) {
                max = g;
            }
            if (g < min) {
                min = g;
            }
        }

        // 去掉最高分和最低分
        sum -= max;
        sum -= min;

        // 计算平均分
        double average = (double) sum / 3;

        return average;
    }
}