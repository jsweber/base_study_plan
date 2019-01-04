import java.lang.Comparable;
import java.util.*;

class Student implements Comparable<Student>
{
    public Student(String name,double score)
    {
        this.name = name;
        this.score = score;
    }
    
    private double score;
    private String name;
    
    
    
    @Override
    public int compareTo(Student o) {
        //借用Double包装类本身的compare方法
        return Double.compare(this.score, o.score);
    }
    
    @Override
    public String toString() {
        
        return String.format("name:%s  score:%f", name,score);
    }
}

public class BaseSort{
    public static void sort(Student[] a){
        System.out.println("sort");
    }

    public static boolean less(Student v, Student w){
        return v.compareTo(w) < 0;
    }

    public static void exch(Student[] a, int i, int j){
        Student t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    public static void show(Student[] a){
        for (int i = 0; i < a.length; i++){
            System.out.println(a[i]);
        }
    }

    public static boolean isSorted(Student[] a){
        for (int i = 1; i < a.length; i++){
            if (less(a[i], a[i - 1])) return false;
        }
        return true;
    }

    public static void main(String[] args){
        Student[] a = { new Student("Lee", 80), new Student("Du", 90), new Student("May", 70), new Student("hu", 50), new Student("ding", 85)};
        sort(a);
        show(a);
    }
}