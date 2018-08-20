
public class ShellSort extends BaseSort{
    
    public static void sort(Student[] a){
       int N = a.length;
       int h =1;
       while(h <  N/3){
           h = 3 * h +1;
       }

       while(h>=1){
           for (int i = h; i < N; i++){
               for (int j = i; j >= h && less(a[j],a[j-h]); j-=h){
                   exch(a, j, j-h);
               }
           }
           h = h/3;
       }
    }

    public static void main(String[] args){
        Student[] a = { new Student("Lee", 80), new Student("Du", 90), new Student("May", 70), new Student("hu", 50), new Student("ding", 85)};
        sort(a);
        show(a);
    }
}
