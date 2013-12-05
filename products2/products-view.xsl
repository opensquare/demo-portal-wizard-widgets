<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="html" encoding="UTF-8"/>
	<xsl:template match="/">
		<xsl:apply-templates select="/pactresponse/entity/IdentifiedEntity"/>
	</xsl:template>
	<xsl:template match="/pactresponse/entity/IdentifiedEntity">
		<p>
			<a>
				<xsl:attribute name="href"><xsl:value-of select="description"/></xsl:attribute>
				<xsl:value-of select="name"/>
			</a>
		</p>
	</xsl:template>
</xsl:stylesheet>
