public class Quick3Sort{
    public static void sort(Student[] a){
        // StdRandom.shuffle(a);
        sort(a, 0, a.length -1);
    }
    private static void sort(Student[] a, int lo, int hi){
        if (lo >= hi) return;
        int i = lo +1;
        int lt = lo;
        int gt = hi;
        Student v = a[lo];
        while(i <= gt){
            int cmp = a[i].compareTo(v);
            if (cmp > 0){
                //i 大于 v 丢 gt右边
                Student t = a[i];
                a[i] = a[gt];
                a[gt--] = t;
            }else if (cmp < 0){
                //i 小于 v 丢lt 左边
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