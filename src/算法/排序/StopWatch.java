public class StopWatch{
	private final long start;
	
	public StopWatch(){
		start = System.currentTimeMillis();
	}
	
	public double stop(){
		long now = System.currentTimeMillis();
		return now - start;
    }
    
    public static void main(String[] args){

    }
}
