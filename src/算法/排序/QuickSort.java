import java.util.*;
//快速排序
public class QuickSort{
    public static void sort(Compare[] a){
        // StdRandom.shuffle(a);
        sort(a, 0, a.length -1);
    }
    private static void sort(Compare[] a, int lo, int hi){
        if (lo >= hi) return;
        int j = partition(a, lo, hi);
        sort(a, lo, j-1);
        sort(a, j+1, hi);
    }

    private static int partition(Compare[] a, int lo, int hi){
        /*
            其实算法的核心就是：把在数组左边但是比v大的元素，和在数组右边但是比v小的元素不断交换
        */
        int i = lo;//左边的指针
        int j = hi+1;//右边的指针
        Compare v = a[lo];//取比较值
        while(true){
            //把比v小的值放到左边，当找到一个比v大的值就停止迭代
            //有时候很不幸，v恰好就是最大值，这时i指针会一直向右边去
            //所以需要一个判断条件防止出错，同理v为最小值时的迭代
            while( v.compareTo(a[++i]) > 0 ) if (i == hi) break;
            //把比v大的值放到右边，当找到一个比v小的就停止迭代
            while( v.compareTo(a[--j]) < 0 ) if (j == lo) break;

            if (i >= j) break;//当左指针和又指针相遇时就停滞最外面的迭代
            //交换值
            exch(a, i, j);
        }
        exch(a, lo, j);
        return j;
    }

    public static void exch(Compare[] a, int i, int j){
        Compare t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    public static void main(String[] args){
        Compare[] a = { new Compare("Lee", 80), new Compare("Du", 90), new Compare("May", 70), new Compare("hu", 50), new Compare("ding", 85), new Compare("jack", 10), new Compare("tt", 35),new Compare("yun", 81), new Compare("xi", 50),new Compare("sex", 70), new Compare("Zhou", 75)};

        sort(a);
        for (int i = 0; i < a.length; i++){
            System.out.println(a[i].key);
            System.out.println(a[i].value);
        }
    }

}