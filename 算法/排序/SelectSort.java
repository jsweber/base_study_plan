
public class SelectSort extends BaseSort{
    
    public static void sort(Student[] a){
        int N = a.length;
        for (int i = 0; i < N; i++){
            int min = i;
            for (int j = i+1; j < N; j++){
                if (less(a[j], a[min])){
                    min = j;
                }
            }
            exch(a, i , min);
        }
    }

    public static void main(String[] args){
        Student[] a = { new Student("Lee", 80), new Student("Du", 90), new Student("May", 70), new Student("hu", 50), new Student("ding", 85)};
        sort(a);
        show(a);
    }
}
