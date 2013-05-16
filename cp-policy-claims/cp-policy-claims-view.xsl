<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="html" encoding="UTF-8"/>
   <xsl:template match="/">
       <xsl:apply-templates select="/pactresponse/entity/TimeSpanEntity"/>
       <p id="cp-policy-details-claim" class="pane">
				<span class="title">New</span>
				<a class="claim add">Add...</a>
			</p>

   </xsl:template>
	<xsl:template match="/pactresponse/entity/TimeSpanEntity">

	<xsl:if test="identifier/relationship = 'claimSummary'"> 

		<xsl:variable name="createTime"><xsl:value-of select="TimeSpanEntityVersion/TimeSpan/PhysicalStartTime"/></xsl:variable>
		
		<p id="cp-policy-details-claim" class="pane">
			<xsl:attribute name="title"><xsl:value-of select="TimeSpanEntityVersion/Properties/Property[@name='claimNumber']"/></xsl:attribute>
			<span class="title"><xsl:value-of select="TimeSpanEntityVersion/Status"/></span>
			<a class="claim">
				<xsl:value-of select="concat(substring-before($createTime, ' '),' ',substring-before(substring-after($createTime, ' '),' '),' ',substring(substring-after(substring-after($createTime, ' '),' '), 1, 4))"/>
			</a>	
		</p>
		
	</xsl:if>	
		
	</xsl:template>
</xsl:stylesheet>