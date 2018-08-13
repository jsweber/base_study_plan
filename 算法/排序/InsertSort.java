
public class InsertSort extends BaseSort{
    
    public static void sort(Student[] a){
        int N = a.length;
        for (int i = 1; i < N; i++){
            for (int j = i; j > 0 && less( a[j], a[j-1] ) ;  j--){
                exch(a, j-1, j);
            }
        }
    }

    public static void main(String[] args){
        Student[] a = { new Student("Lee", 80), new Student("Du", 90), new Student("May", 70), new Student("hu", 50), new Student("ding", 85)};
        sort(a);
        show(a);
    }
}
