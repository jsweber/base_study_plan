//book p136
public class WUF{
    protected int[] id;
    protected int[] sz;
    private int count;

    public WUF(int N){
        count = N;
        id = new int[N];
        for (int i= 0; i<N; i++){
            id[i] = i;
        }

        sz = new int[N];
        for (int i= 0; i<N; i++){
            sz[i] = 1;
        }
    }

    public int count(){
        return count;
    }
    public int find(int p){
        while (p != id[p]){
            p = id[p];
        }
        return p;
    }
    public void union(int p, int q){
        int pid = find(p);
        int qid = find(q);

        if (pid == qid) return;
        //ensure small tree union to big tree 
        if (sz[pid] < sz[qid]){
            id[pid] = qid;
            sz[qid]+=sz[pid];
        }else {
            id[qid] = pid;
            sz[pid]+=sz[qid];
        }
        
        count--;
    }

    public boolean connected(int i, int j){
        return find(i) == find(j);
    }

    public static void main(String[] args){
        int[] arr = {3, 5, 13, 1, 11, 14, 9, 0, 4, 7, 15, 6, 10, 2, 12, 8};
        UF uf = new UF(arr.length);
        for (int i = 0; i < arr.length; i+=2){
            int p = arr[i];
            int q = arr[i+1];
            uf.union(p, q);
            System.out.println("p="+p +" q="+q);
        }

        for (int i = 0; i < uf.id.length; i++){
            System.out.println(uf.id[i]);
        }
    }
}