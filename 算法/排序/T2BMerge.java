import java.util.Random;
import java.lang.*;

public class T2BMerge{
    private static Student[] aux;

    public static void sort(Student[] ss){
        int N = ss.length;
        aux = new Student[N];
        sort(ss, 0, N-1);
    }

    private static void sort(Student[] ss, int lo, int hi){
        if (lo >= hi) return;
        int mid = lo + (hi - lo)/2;
        sort(ss, lo, mid);
        sort(ss, mid+1, hi);
        merge(ss, lo, mid, hi);
    }

    public static void merge(Student[] ss, int lo, int mid, int hi){
        int i = lo;
        int j = mid + 1;
        for (int n = lo; n<= hi; n++){
            aux[n] = ss[n];
        }

        for (int n = lo; n <= hi; n++){
            if (i > mid){
                ss[n] = aux[j++];
            }else if (j > hi){
                ss[n] = aux[i++];
            }else if (aux[i].compareTo(aux[j]) > 0  ){
                ss[n] = aux[j++];
            }else if( aux[i].compareTo(aux[j]) <= 0  ){
                ss[n] = aux[i++];
            }
        }
    }

    public static void show(Student[] a){
        for (int i = 0; i < a.length; i++){
            System.out.println(a[i]);
        }
    }

    public static void main(String[] args){
        Student[] ss  = new Student[1000];
        Random random = new Random();
        
        for (int i = 0; i < 1000; i++){
            ss[i] = new Student("st"+i,  random.nextDouble()*1000);
        }

        sort(ss);
        show(ss);
    }
}
