package daike;
import java.util.Scanner;
public class printlnTest {
    public static void println(){
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入姓名");
        String name =sc.nextLine(); ;
        System.out.println("请输入年龄");
        int age =sc.nextInt();
        sc.nextLine();
        System.out.println("请输入学院");
        String college =sc.nextLine();
        System.out.println("请输入专业");
        String major =sc.nextLine();
        System.out.println("请输入班级");
        String class1 =sc.nextLine();
        System.out.println("姓名："+name);
        System.out.println("年龄："+age);
        System.out.println("学院："+college);
        System.out.println("专业："+major);
        System.ou·t.println("班级："+class1);

    }
}
