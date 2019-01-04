import java.util.Random;
import java.lang.*;

public class B2TMerge{
    private static Student[] aux;

    public static void sort(Student[] ss){
        int N = ss.length;
        aux = new Student[N];
        for (int sz = 1; sz < N; sz+=sz){
            for (int lo = 0; lo < N - sz; lo+=sz*2){
                merge(ss, lo, lo+sz-1, Math.min(lo + sz+sz-1, N-1));
            }
        }
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