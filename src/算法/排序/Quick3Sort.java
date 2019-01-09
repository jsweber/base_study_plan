public class Quick3Sort{
    public static void sort(Compare[] a){
        // StdRandom.shuffle(a);
        sort(a, 0, a.length -1);
    }
    private static void sort(Compare[] a, int lo, int hi){
        if (lo >= hi) return;
        int i = lo +1;
        int lt = lo;
        int gt = hi;
        Compare v = a[lo];
        while(i <= gt){
            int cmp = a[i].compareTo(v);
            if (cmp > 0){
                //i 大于 v 丢 gt右边
                Compare t = a[i];
                a[i] = a[gt];
                a[gt--] = t;
            }else if (cmp < 0){
                //i 小于 v 丢lt 左边
                Compare t = a[i];
                a[i++] = a[lt];
                a[lt++] = t;
            }else {
                i++;
            }

        }
        sort(a, lo, lt-1);
        sort(a, gt+1, hi);
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