// import java.util.*;
public class QuickSort{
    public static void sort(Student[] a){
        // StdRandom.shuffle(a);
        sort(a, 0, a.length -1);
    }
    private static void sort(Student[] a, int lo, int hi){
        if (lo >= hi) return;
        int j = partition(a, lo, hi);
        sort(a, lo, j-1);
        sort(a, j+1, hi);
    }

    private static int partition(Student[] a, int lo, int hi){
        int i = lo;
        int j = hi+1;
        Student v = a[lo];
        while(true){
            while( v.compareTo(a[++i]) > 0) if (i == hi) break;
            while( v.compareTo(a[--j]) < 0 ) if (j == lo) break;

            if (i >= j) break;
            Student t = a[i];
            a[i] = a[j];
            a[j] = t;
        }
        Student temp = v;
        v = a[j];
        a[j] = temp;
        return j;
    }
    public static void main(String[] args){
        
    }

}