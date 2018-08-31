import java.lang.Comparable;
import java.util.*;

public class Compare implements Comparable<Compare>{
    public double value;
    public String key;
    public  Compare(String key, double value){
        this.key = key;
        this.value = value;
    }

    @Override
    public int compareTo(Compare o) {
        //借用Double包装类本身的compare方法
        //当this.value > o.value => 1
        //this.value == o.value => 0
        //this.value < o.value => -1
        return Double.compare(this.value, o.value);
    }

    public boolean less(Compare c1, Compare c2){
        if (c1.compareTo(c2) < 0){
            return true;
        }
        return false;
    }

    public void exch(Compare c1, Compare c2){
        Compare t = c1;
        c1 = c2;
        c2 = t;
    }
    public void showKey(){
        System.out.println(key);
    }

    public static void main(String[] args){
        Compare judgment = new Compare("_",  100);
        Compare c1 = new Compare("Lee", 78);
        Compare c2 = new Compare("Du", 98);
        System.out.println(c1.compareTo(c2));
        System.out.println(judgment.less(c1, c2));


    }
}
