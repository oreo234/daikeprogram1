package daike;
import java.util.Scanner;
public class isEven {
    private static int sin()
    {
        Scanner sc = new Scanner(System.in);
        String s=sc.nextLine();
        try {
            int n = Integer.parseInt(s);
            if(n<0)
                n=-n;
            return n;
        } catch (NumberFormatException e) {
            System.out.println("输入的不是有效的整数或超出整数范围！");
        } finally {
            sc.close();

        }
        return -1;
    }
    public static Boolean isEven(){
        int data=sin();
        if (data%2==0)
            System.out.println("偶数");
        else if(data%2==-1)
        {}
        else
            System.out.println("奇数");

        return null;
    }
}
