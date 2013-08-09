<%@ page import="com.osl.security.OslPrinciple" %>
<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ page import="org.apache.shiro.subject.Subject" %>
<%Subject user = SecurityUtils.getSubject();%>
<%OslPrinciple oslPrinciple = user.getPrincipals().oneByType(OslPrinciple.class);%>
<span id="header-user-name"><a href="#internal/profile"><%=oslPrinciple.getDisplayName()%></a></span>
<a id="header-logout" href="/logout">Logout</a>
