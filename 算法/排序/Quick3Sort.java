public class Quick3Sort{
    private static void sort(Student[] a, int lo, int hi){
        if (lo >= hi) return;
        int i = lo +1;
        int lt = lo;
        int gt = hi;
        Student v = a[lo];
        while(i <= gt){
            int cmp = a[i].compareTo(v);
            if (cmp > 0){
                Student t = a[i];
                a[i] = a[gt];
                a[gt--] = t;
            }else if (cmp < 0){
                Student t = a[i];
                a[i++] = a[lt];
                a[lt++] = t;
            }else {
                i++;
            }

        }
        sort(a, lo, lt-1);
        sort(a, gt+1, hi);
    }
}