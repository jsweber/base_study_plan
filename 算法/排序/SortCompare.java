import java.util.Random;
import java.lang.*;

public class SortCompare{
    public static double time(String alg, Student[] a){
        StopWatch timer = new StopWatch();

        if (alg.equals("Insert")) InsertSort.sort(a);
        if (alg.equals("Select")) SelectSort.sort(a);
        if (alg.equals("Shell")) ShellSort.sort(a);
        return timer.stop();
    }

    public static double timeRandom(String alg, int N, int T){
        double total = 0.0;
        Student[] ss = new Student[N];
        Random random = new Random();

        for (int t = 0; t < T; t++){
            for (int n = 0; n < N; n++){
                ss[n] = new Student("st"+n, random.nextDouble()*1000);
            }
            total += time(alg, ss);
        }
        return total;
    }

    public static void main(String[] args){
        String alg1 = args[0];
        String alg2 = args[1];
        int N = Integer.parseInt(args[2]);
        int T = Integer.parseInt(args[3]);

        double t1 = timeRandom(alg1, N, T);
        double t2 = timeRandom(alg2, N, T);
        System.out.println(t1);
        System.out.println(t2);
    }

}