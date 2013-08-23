<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="html" encoding="UTF-8"/>
	<xsl:template match="/">
			<ul>
				<xsl:apply-templates select="/pactresponse/entity/IdentifiedEntity"/>
			</ul>
	</xsl:template>
	<xsl:template match="/pactresponse/entity/IdentifiedEntity">
        <xsl:variable name="productName"><xsl:value-of select="tokenize(description, '\|')[1]"/></xsl:variable>
        <xsl:variable name="productStatus"><xsl:value-of select="tokenize(description, '\|')[2]"/></xsl:variable>
        <xsl:variable name="productEffectiveTime"><xsl:value-of select="tokenize(description, '\|')[3]"/></xsl:variable>
		<li>
            <xsl:attribute name="class"><xsl:value-of select="$productStatus"/></xsl:attribute>
			<a>
				<xsl:attribute name="href">#product/show/<xsl:value-of select="identifier/uid"/></xsl:attribute>
                <span class="productName"><xsl:value-of select="$productName"/></span>
                <span class="productStatus"><xsl:value-of select="$productStatus"/></span>
                <span class="productEffectiveTime"><xsl:value-of select="$productEffectiveTime"/></span>
			</a>
            <a class="popup"><xsl:attribute name="href">#internal/change-status/<xsl:value-of select="identifier/uid"/></xsl:attribute>Change Status</a>
		</li>
	</xsl:template>
</xsl:stylesheet>
