<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ page import="org.apache.shiro.subject.Subject" %>

<%Subject user = SecurityUtils.getSubject();%>

						<%if (user.isPermitted("quotes-search") || user.isPermitted("quotes-quote")) {%>
						<div class="new-square-group">
							<h3>Quotes</h3>
							<%if (user.isPermitted("quotes-search")) {%>
							<a class="new-square" href="#quote/search" type="quote" subtype="search">Quote search</a>
							<%}%>
							<%if (user.isPermitted("quotes-quote")) {%>
							<a class="new-square" href="#quote/new" type="quote" subtype="new">New quote</a>
							<%}%>
						</div>
						<%}%>
						<%if (user.isPermitted("policy-search") || user.isPermitted("policy-nb") || user.isPermitted("policy-servicing") || user.isPermitted("policy-renewals")) {%>
						<div class="new-square-group">
							<h3>Policies</h3>
							<%if (user.isPermitted("policy-search")) {%>
							<a class="new-square" href="#policy/search" type="policy" subtype="search">Policy search</a>
							<%}%>
							<%if (user.isPermitted("policy-nb")) {%>
							<a class="new-square" href="#policy/newbusiness" type="policy" subtype="newbusiness">New business</a>
							<%}%>
							<%if (user.isPermitted("policy-servicing")) {%>
							<a class="new-square" href="#policy/servicing" type="policy" subtype="servicing">Servicing</a>
							<%}%>
							<%if (user.isPermitted("policy-renewals")) {%>
							<a class="new-square" href="#policy/renewals" type="policy" subtype="renewals">Renewals</a>
							<%}%>
						</div>
						<%}%>
						<%if (user.isPermitted("finance-accounts")) {%>
						<div class="new-square-group">
							<h3>Finance</h3>
							<a class="new-square" href="#finance/accounts" type="finance" subtype="accounts">Company accounts</a>
							<!--a class="new-square" href="#finance/life" type="finance" subtype="life">Life accounts</a>
							<a class="new-square" href="#finance/nonlife" type="finance" subtype="nonlife">Non-life accounts</a>
							<a class="new-square" href="#finance/lifereserves" type="finance" subtype="lifereserves">Life reserving accounts</a>
							<a class="new-square" href="#finance/nonlifereserves" type="finance" subtype="nonlifereserves">Non-life reserving accounts</a-->
						</div>
						<%}%>
						<%if (user.isPermitted("claims-search") || user.isPermitted("claims-claim")) {%>
						<div class="new-square-group">
							<h3>Claims</h3>
							<%if (user.isPermitted("claims-search")) {%>
							<a class="new-square" href="#claims/search" type="claims" subtype="search">Claim search</a>
							<%}%>
							<%if (user.isPermitted("claims-claim")) {%>
							<a class="new-square" href="#claims/newclaim" type="claims" subtype="new">New claim</a>
							<%}%>
						</div>
						<%}%>
						<%if (user.isPermitted("documents-search")) {%>
						<div class="new-square-group">
							<h3>Documents</h3>
							<a class="new-square" href="#documents/search" type="documents" subtype="search">Document search</a>
						</div>
						<%}%>
						<%if (user.isPermitted("mis-dashboard") || user.isPermitted("mis-reports")) {%>
						<div class="new-square-group">
							<h3>Management</h3>
							<%if (user.isPermitted("mis-dashboard")) {%>
							<a class="new-square" href="#mis/dashboard" type="mis" subtype="dashboard">Executive dashboard</a>
							<%}%>
							<%if (user.isPermitted("mis-reports")) {%>
							<a class="new-square" href="#mis/reports" type="mis" subtype="reports">Reports</a>
							<a class="new-square" href="#mis/fraud" type="mis" subtype="fraud">Fraud detection</a>
							<%}%>
						</div>
						<%}%>
						<div class="new-square-group">
							<h3>Configuration</h3>
							<%if (user.isPermitted("internal-products")) {%>
							<a class="new-square" href="#internal/products" type="internal" subtype="products">Product management</a>
							<%}%>
							<a class="new-square" href="#internal/users" type="internal" subtype="users">User management</a>
							<a class="new-square" href="#internal/profile?1234-5678-9012-3456" type="internal" subtype="profile">Personal profile</a>
							<%if (user.isPermitted("internal-batch")) {%>
							<a class="new-square" href="#internal/batch" type="internal" subtype="batch">Automated jobs</a>
							<%}%>
						</div>
						<%if (user.isPermitted("external-network") || user.isPermitted("external-pactdash") || user.isPermitted("external-napierdash") || user.isPermitted("external-mmdash") || user.isPermitted("external-pwdash")) {%>
						<div class="new-square-group">
							<h3>Sys Admin</h3>
							<%if (user.isPermitted("external-network")) {%>
							<a class="new-square" href="http://mis-zabbix.osl-cloud.com/zabbix/" target="zabbix" type="external" subtype="network">Network management</a>
							<%}%>
							<%if (user.isPermitted("external-pactdash")) {%>
							<a class="new-square" href="https://project-pact.osl-cloud.com/" target="pact" type="external" subtype="pactdash">Pact dashboard</a>
							<%}%>
							<%if (user.isPermitted("external-napierdash")) {%>
							<a class="new-square" href="https://project-napier.osl-cloud.com/" target="napier" type="external" subtype="napierdash">Napier dashboard</a>
							<%}%>
							<%if (user.isPermitted("external-mmdash")) {%>
							<a class="new-square" href="https://model-office-mailmerger.osl-cloud.com/" target="mailmerger" type="external" subtype="mmdash">MailMerger dashboard</a>
							<%}%>
							<%if (user.isPermitted("external-pwdash")) {%>
							<a class="new-square" href="http://project-portalwizard.osl-cloud.com/" target="portalwizard" type="external" subtype="pwdash">PortalWizard dashboard</a>
							<%}%>
						</div>
						<%}%>