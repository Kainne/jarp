// this is a comment

import java.util.*;

public class Echo {

  public static Scanner in;

  public static void main(String[] args) {
    in = new Scanner(System.in);

    doStuff();
  }

  public static void doStuff() {

    while (in.hasNextLine()) {
      solve();
    }
  }

  public static void solve() {
    System.out.println(in.nextLine());
  }
}

