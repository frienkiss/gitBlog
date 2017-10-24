/**
 * Created by Bobo on 2017/5/14.
 */



function checkform() {




    //window.open("https://www.baidu.com");                  js   jsp  不同
    /* Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
     var url = "jdbc:odbc:JDBC-Tea";
     Connection con = DriverManager.getConnection(url);
     Statement stmt=con.createStatement();
     request.setCharacterEncoding("gb2312");*/
    var usr = document.myform.username.value;
    //var pwd = document.getElementById("input")//返回第一个对象
    //var pwd=document.myform.password.value;
    var pwd = document.getElementsByName("password");//返回集合

    /* String sql="select password from vistor  when username='"+usr+"'";
     ResultSet rs=stmt.executeQuery(sql);//输入编号可以成功，输入字符串任何都可以进入这个页面
     if(rs.next()){
     String pass=rs.getString(1);
     if(pass.equals(pwd)) {
     response.sendRedirect("Teaindex.html");
     }
     else{
     history.back()}
     }*/
    alert(usr);
    alert(pwd[0].value);
    if (usr == "bobo" && pwd[0].value== "123")//pwd.value返回undefined
        window.open("https://www.baidu.com");

    return false;
};

