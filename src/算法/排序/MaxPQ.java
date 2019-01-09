public class MaxPQ{
    private Compare[] pq;
    private int N = 0;

    public MaxPQ(int maxN){
        pq = new Compare[maxN + 1];
    }

    public boolean isEmpty(){
        return N == 0;
    }

    public int size(){
        return N;
    }

    public void insert(Compare v){
        pq[++N] = v;
        swim(N);
    }

    public Compare delMax(){
        Compare max = pq[1];
        exch(1, N--);
        pq[N + 1] = null;
        sink(1);
        return max;
    }

    public boolean less(int i, int j){
        return pq[i].compareTo(pq[j]) < 0;
    }

    private void exch(int i, int j){
        Compare t = pq[i];
        pq[i] = pq[j];
        pq[j] = t;
    }

    private void swim(int k){
        while(k > 1 && less(k/2, k)){
            exch(k/2, k);
            k = k/2;
        }
    }

    private void sink(int k){
        while(2 * k <= N){
            int j = 2 * k;
            if (j < N && less(j, j+1)) j++;
            if (!less(k, j)) break;
            exch(k, j);
            k = j;
        }
    }

    public void show(){
        for (int i = 0; i < N; i++){
            pq[i].showKey();
        }
    }

    public static void main(String[] args){
        Compare c1 = new Compare("Lee", 75);
        Compare c2 = new Compare("du", 90);
        Compare c3 = new Compare("Lu", 60);
        MaxPQ p = new MaxPQ(20);
        p.insert(c1);
        p.insert(c2);
        p.insert(c3);
        System.out.println(p.size());
    }
}
