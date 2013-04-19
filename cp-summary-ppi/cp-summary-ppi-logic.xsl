<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="html" encoding="UTF-8"/>
   <xsl:template match="/">
       <xsl:apply-templates select="/pactresponse/entity/IdentifiedEntity"/>
   </xsl:template>
	<xsl:template match="/pactresponse/entity/IdentifiedEntity">
		<h1 id="cp-policy-title"><xsl:value-of select="tokenize(description, ', ')[1]"/> Policy <span id="cp-policy-switcher" title="Select another policy"></span></h1>

		<details id="cp-policy-summary" open="open">
			<a name="cp-policy-summary"></a>
			<summary>Summary</summary>
			<div id="cp-policy-summary-cover" class="pane">
				<span class="title">Cover</span>
				<span class="cover comp"><xsl:value-of select="tokenize(description, ', ')[2]"/></span>
				<span class="cover comp"><xsl:value-of select="tokenize(description, ', ')[3]"/></span>
				<span class="cover comp"><xsl:value-of select="tokenize(description, ', ')[4]"/></span>
				<span class="cover comp"><xsl:value-of select="tokenize(description, ', ')[5]"/></span>
				<span class="cover comp"><xsl:value-of select="tokenize(description, ', ')[6]"/></span>
			</div>
			<div id="cp-policy-summary-renewal" class="pane">
				<span class="title">Renewal</span>
				<span class="renewal-day"><xsl:value-of select="tokenize(description, ', ')[7]"/></span>
				<span class="renewal-month"><xsl:value-of select="tokenize(description, ', ')[8]"/></span>
				<span class="renewal-year"><xsl:value-of select="tokenize(description, ', ')[9]"/></span>
			</div>
			<div id="cp-policy-summary-premium" class="pane">
				<span class="title">Premium</span>
				<span class="premium-due">fixme</span>
			</div>
		</details>
	</xsl:template>
</xsl:stylesheet>
