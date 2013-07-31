<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="html" encoding="UTF-8"/>
	<xsl:template match="/">
			<ul>
				<xsl:apply-templates select="/pactresponse/entity/IdentifiedEntity"/>
			</ul>
	</xsl:template>
	<xsl:template match="/pactresponse/entity/IdentifiedEntity">
		<li>
			<a>
				<xsl:attribute name="href">#product/show/<xsl:value-of select="identifier/uid"/></xsl:attribute>
				<xsl:value-of select="description"/>
			</a>
            <a class="popup"><xsl:attribute name="href">#internal/change-status/<xsl:value-of select="identifier/uid"/></xsl:attribute>Change Status</a>
		</li>
	</xsl:template>
</xsl:stylesheet>
