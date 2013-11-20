public class Inheritance {

    public static void main(String[] args) {
        Child c = new Child();
        System.out.println(c.test());
    }
}

class Parent {
    public String test() {
        return "test";
    }
}

class Child extends Parent {
}

